import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import * as Jimp from 'jimp';
import { extractS3KeyFromUrl } from 'src/utils/extract-s3-key-from-url.utils';
import { splitBufferIntoChunks } from 'src/utils/split-buffer-into-chucks';
import { v4 as uuid } from 'uuid';

import { Files } from './files.entity';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
    private logger = new Logger('S3Uploadder');
    private s3: AWS.S3;
    private AWS_BUCKET: string;

    constructor(
        configService: ConfigService,
        @InjectRepository(FilesRepository)
        private filesRepository: FilesRepository,
    ) {
        this.s3 = new AWS.S3({
            region: configService.get<string>('AWS_REGION'),
            credentials: new AWS.Credentials({
                accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
                secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
            }),
        });
        this.AWS_BUCKET = configService.get<string>('AWS_BUCKET_NAME');
    }

    async resizeImages(image: any): Promise<Buffer> {
        const jimpImage = await Jimp.read(image);
        const imageWidth = jimpImage.bitmap.width;

        if (imageWidth > 1800) {
            image = await jimpImage.resize(1800, Jimp.AUTO).quality(70).getBufferAsync(Jimp.MIME_JPEG);
        }

        image = await jimpImage.background(0xffffffff).getBufferAsync(Jimp.MIME_PNG);

        return image;
    }

    async uploadImage(file: any, folderName: string, fileExtension = '.webp'): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');

        const extension = !fileExtension ? file.originalname.split('.') : fileExtension;
        const urlKey = !fileExtension
            ? `images/${folderName}/${uuid()}.${extension[extension.length - 1]}`
            : `images/${folderName}/${uuid()}${fileExtension}`;

        const buffer = Buffer.from(file.buffer);

        const params = {
            Body: await this.resizeImages(buffer),
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        const data = await this.s3
            .putObject(params)
            .promise()
            .then(
                () => {
                    return {
                        filePath: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                    };
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error loading image to S3');
                },
            );

        return await this.filesRepository.createFiles({
            url: data.filePath,
            fileType: 'image',
        });
    }

    async uploadPdf(file: any, folderName: string): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');
        const fileExtension = '.pdf';

        const extension = !fileExtension ? file.originalname.split('.') : fileExtension;
        const urlKey = !fileExtension
            ? `pdf-files/${folderName}/${uuid()}.${extension[extension.length - 1]}`
            : `pdf-files/${folderName}/${uuid()}${fileExtension}`;

        const buffer = Buffer.from(file.buffer);

        const params = {
            Body: buffer,
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        const data = await this.s3
            .putObject(params)
            .promise()
            .then(
                () => {
                    return {
                        filePath: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                    };
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error loading pdf to S3');
                },
            );

        return await this.filesRepository.createFiles({
            url: data.filePath,
            fileType: 'pdf',
        });
    }

    async getFilesByArrayId(filesId: number[]) {
        return await this.filesRepository.getFilesByArrayId(filesId);
    }

    async deleteFileFromAWS(file: Files): Promise<void> {
        if (!file) throw new BadRequestException('File undefined');

        const urlKey = file.url.split('/').slice(3).join('/');
        const params = {
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
        };
        await this.s3
            .deleteObject(params)
            .promise()
            .then(
                () => {
                    return true;
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error deleting pdf from S3');
                },
            );

        await this.filesRepository.softDelete({ id: file.id });
    }

    async uploadVideo(file: any, folderName: string): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');

        const fileExtension = '.mp4';
        const extension = file.originalname.split('.');
        const urlKey = `videos/${folderName}/${uuid()}.${extension[extension.length - 1]}`;

        const params = {
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };

        try {
            const multipartUpload = await this.s3.createMultipartUpload(params).promise();
            const uploadId = multipartUpload.UploadId;
            const chunkSize = 5 * 1024 * 1024; // 5MB
            const chunks = splitBufferIntoChunks(file.buffer, chunkSize);
            const uploadPromises = [];
            let partNumber = 1;

            chunks.forEach((chunk) => {
                const partParams = {
                    Body: chunk,
                    Bucket: this.AWS_BUCKET,
                    Key: urlKey,
                    UploadId: uploadId,
                    PartNumber: partNumber,
                };
                uploadPromises.push(this.s3.uploadPart(partParams).promise());
                partNumber++;
            });

            const uploadedParts = await Promise.all(uploadPromises);

            const completeParams = {
                Bucket: this.AWS_BUCKET,
                Key: urlKey,
                UploadId: multipartUpload.UploadId,
                MultipartUpload: {
                    Parts: uploadedParts.map((part, index) => ({
                        ETag: part.ETag,
                        PartNumber: index + 1,
                    })),
                },
            };

            await this.s3.completeMultipartUpload(completeParams).promise();

            return await this.filesRepository.createFiles({
                url: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                fileType: 'video',
            });
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException('Error uploading video to S3 using multipart upload');
        }
    }

    async editImage(file: any, id: number): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');

        const buffer = Buffer.from(file.buffer);

        const fileToUpdategetFile = await this.filesRepository.getFile(id);

        const urlKey = extractS3KeyFromUrl(fileToUpdategetFile.url);
        // TODO: investigar este posible problema en el front https://stackoverflow.com/questions/63890260/update-an-image-into-aws-s3-with-nodejs
        const params = {
            Body: await this.resizeImages(buffer),
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        await this.s3
            .putObject(params)
            .promise()
            .then(
                () => {
                    return {
                        filePath: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                    };
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error loading file to S3');
                },
            );

        return await this.filesRepository.updateFile(id);
    }

    async editVideo(file: any, id: number): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');

        const buffer = Buffer.from(file.buffer);

        const fileToUpdategetFile = await this.filesRepository.getFile(id);

        const urlKey = extractS3KeyFromUrl(fileToUpdategetFile.url);
        const params = {
            Body: await buffer,
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        await this.s3
            .putObject(params)
            .promise()
            .then(
                () => {
                    return {
                        filePath: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                    };
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error loading file to S3');
                },
            );

        return await this.filesRepository.updateFile(id);
    }

    async editPdf(file: any, id: number): Promise<Files> {
        if (file === undefined) throw new BadRequestException('File undefined');

        const buffer = Buffer.from(file.buffer);

        const fileToUpdategetFile = await this.filesRepository.getFile(id);

        const urlKey = extractS3KeyFromUrl(fileToUpdategetFile.url);
        const params = {
            Body: await buffer,
            Bucket: this.AWS_BUCKET,
            Key: urlKey,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        await this.s3
            .putObject(params)
            .promise()
            .then(
                () => {
                    return {
                        filePath: `https://${this.AWS_BUCKET}.s3.amazonaws.com/${urlKey}`,
                    };
                },
                (err) => {
                    this.logger.error(err);
                    throw new InternalServerErrorException('Error loading file to S3');
                },
            );

        return await this.filesRepository.updateFile(id);
    }
}
