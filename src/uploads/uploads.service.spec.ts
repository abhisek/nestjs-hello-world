import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';
import { UploadVisibility } from './uploads.dto';

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsService],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generatePresignedUrl', () => {
    it('should return a signed URL', async () => {
      const url = await service.generatePresignedUrl(
        'test.txt',
        UploadVisibility.PUBLIC,
      );

      expect(url).toBeDefined();
      expect(url).toMatch(/^https/);
      expect(url).toContain('UNSIGNED-PAYLOAD');
      expect(url).toContain('test-txt');
    });
  });
});
