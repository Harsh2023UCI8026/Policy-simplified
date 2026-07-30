import { Injectable } from '@nestjs/common';

@Injectable()
export class PoliciesService {
  upload(file: Express.Multer.File) {
    return {
      success: true,
      message: "File uploaded (mock)"
    };
  }
}
