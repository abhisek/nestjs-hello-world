import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpException, Injectable } from '@nestjs/common';
import { UploadVisibility } from './uploads.dto';

const S3_BUCKET = process.env.S3_BUCKET ?? 'nest-upload-demo';
const S3_REGION = process.env.S3_REGION ?? 'us-east-1';

@Injectable()
export class UploadsService {
  async generatePresignedUrl(
    fileName: string,
    visibility: UploadVisibility,
  ): Promise<string> {
    if (!fileName) {
      throw new HttpException('A filename is required', 400);
    }

    if (!visibility) {
      visibility = UploadVisibility.PRIVATE;
    }

    const key = `${this.safeFileName(fileName)}-${this.randomSuffix()}`;
    const client = new S3Client({ region: S3_REGION });
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    });

    return await getSignedUrl(client, command, { expiresIn: 60 * 15 });
  }

  private safeFileName(fileName: string): string {
    return fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

  private randomSuffix(): string {
    return Math.random().toString(36).substring(8);
  }
}
