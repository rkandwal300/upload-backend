// src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadChunkDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('chunk')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk(
    @UploadedFile() file: { buffer: Buffer },
    // @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadChunkDto,
  ) {
    const { uploadId, chunkIndex } = body;
    await this.uploadService.saveChunk(uploadId, chunkIndex, file.buffer);
    return { message: 'Chunk uploaded' };
  }

  @Post('merge')
  async mergeChunks(
    @Query('uploadId') uploadId: string,
    @Query('filename') filename: string,
  ) {
    const filePath = await this.uploadService.mergeChunks(uploadId, filename);
    return { message: 'File merged', path: filePath };
  }
}
