import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { UploadResponseDTO, UploadVisibility } from './uploads.dto';

describe('UploadsController', () => {
  let controller: UploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [UploadsService],
    }).compile();

    controller = module.get<UploadsController>(UploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a signed URL', async () => {
    const response: UploadResponseDTO = await controller.generatePresignedUrl({
      filename: 'test.txt',
      visibility: UploadVisibility.PUBLIC,
    });

    expect(response.url).toBeDefined();
    expect(response.url).toMatch(/^https/);
    expect(response.url).toContain('UNSIGNED-PAYLOAD');
    expect(response.url).toContain('test-txt');
  });
});
