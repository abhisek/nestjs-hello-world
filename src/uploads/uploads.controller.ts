import { Body, Controller, Post } from '@nestjs/common';
import { UploadRequestDTO, UploadResponseDTO } from './uploads.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/')
  async generatePresignedUrl(
    @Body() request: UploadRequestDTO,
  ): Promise<UploadResponseDTO> {
    return {
      url: await this.uploadsService.generatePresignedUrl(
        request.filename,
        request.visibility,
      ),
    };
  }
}
