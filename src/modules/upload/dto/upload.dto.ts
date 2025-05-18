// src/upload/dto/upload-chunk.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class UploadChunkDto {
  @IsString()
  filename: string;

  @IsNumber()
  chunkIndex: number;

  @IsString()
  uploadId: string; // Unique identifier for upload session
}
