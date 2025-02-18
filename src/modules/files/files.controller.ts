import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { Files } from './files.entity';
import { FilesService } from './files.service';

@Controller('files')
@UseGuards(AuthGuard())
@ApiTags('Files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Post('upload-image/:folderName')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(
        @UploadedFile() file: any,
        @Param('folderName') folderName: string,
        @Query('feature', ParseBoolPipe) feature: boolean,
    ): Promise<Files> {
        return this.filesService.uploadImage(file, folderName);
    }

    @Post('upload-pdf/:folderName')
    @UseInterceptors(FileInterceptor('file'))
    uploadPdf(
        @UploadedFile() file: any,
        @Param('folderName') folderName: string,
        @Query('feature', ParseBoolPipe) feature: boolean,
    ): Promise<Files> {
        return this.filesService.uploadPdf(file, folderName);
    }

    @Post('upload-video/:folderName')
    @UseInterceptors(FileInterceptor('file'))
    uploadVideo(
        @UploadedFile() file: any,
        @Param('folderName') folderName: string,
        @Query('feature', ParseBoolPipe) feature: boolean,
    ): Promise<Files> {
        return this.filesService.uploadVideo(file, folderName);
    }

    @Delete('/delete')
    async deleteFileFromAWS(@Body() file: any) {
        return await this.filesService.deleteFileFromAWS(file);
    }

    @Get()
    async getFilesByArrayId(@Body() body: { ids: number[] }): Promise<Files[]> {
        const { ids } = body;
        return await this.filesService.getFilesByArrayId(ids);
    }

    @Patch('edit-image/:id')
    @UseInterceptors(FileInterceptor('file'))
    UpdateImage(@UploadedFile() file: any, @Param('id', ParseIntPipe) fileId: number): Promise<Files> {
        return this.filesService.editImage(file, fileId);
    }

    @Patch('edit-pdf/:id')
    @UseInterceptors(FileInterceptor('file'))
    UpdatePdf(@UploadedFile() file: any, @Param('id', ParseIntPipe) fileId: number): Promise<Files> {
        return this.filesService.editPdf(file, fileId);
    }

    @Patch('edit-video/:id')
    @UseInterceptors(FileInterceptor('file'))
    UpdateVideo(@UploadedFile() file: any, @Param('id', ParseIntPipe) fileId: number): Promise<Files> {
        return this.filesService.editVideo(file, fileId);
    }
}
