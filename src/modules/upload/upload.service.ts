// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);
// const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);
const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

@Injectable()
export class UploadService {
  private readonly CHUNK_DIR = path.join(__dirname, '..', '..', 'uploads');

  async saveChunk(uploadId: string, chunkIndex: number, fileBuffer: Buffer) {
    const uploadPath = path.join(this.CHUNK_DIR, uploadId);

    if (!(await exists(uploadPath))) {
      await mkdir(uploadPath, { recursive: true });
    }

    const chunkPath = path.join(uploadPath, `${chunkIndex}`);
    await writeFile(chunkPath, fileBuffer);
  }

  async mergeChunks(uploadId: string, finalFilename: string): Promise<string> {
    const uploadPath = path.join(this.CHUNK_DIR, uploadId);
    const files = await readdir(uploadPath);

    const sortedFiles = files
      .map((name) => parseInt(name))
      .sort((a, b) => a - b);

    const outputPath = path.join(this.CHUNK_DIR, `${finalFilename}`);
    const writeStream = fs.createWriteStream(outputPath);

    for (const index of sortedFiles) {
      const chunkPath = path.join(uploadPath, index.toString());
      const buffer = await readFile(chunkPath);
      writeStream.write(buffer);
    }

    writeStream.end();

    // Clean up
    for (const index of sortedFiles) {
      const chunkPath = path.join(uploadPath, index.toString());
      await unlink(chunkPath);
    }

    await rmdir(uploadPath);

    return outputPath;
  }
}
