export function extractS3KeyFromUrl(s3Url: string): string {
    const bucketUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`;
    if (s3Url.startsWith(bucketUrl)) {
        return s3Url.substring(bucketUrl.length);
    } else {
        throw new Error('La URL proporcionada no coincide con el bucket S3.');
    }
}
