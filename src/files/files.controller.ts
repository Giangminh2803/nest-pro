import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MulterConfigService } from './multer.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Post('upload')
  @UseInterceptors(FileInterceptor('imageFile'))
  @ResponseMessage('Upload files!')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename
    }
  }

  private chunkBase64(base64: string, chunkSize: number): string[] {
    const chunks = [];
    for (let i = 0; i < base64.length; i += chunkSize) {
      chunks.push(base64.slice(i, i + chunkSize));
    }
    return chunks;
  }

  @Public()
  @Post('uploadBase64')
  @UseInterceptors(FileInterceptor('imageFile' , MulterConfigService.memoryStorageConfig()))
  @ResponseMessage('Upload files!')
  uploadFileBase64(@UploadedFile() file: Express.Multer.File) {
    const base64Image = file.buffer.toString('base64');
    
    const maxChunkSize = 3 * 1024 * 1024; // 8MB
    let imageChunks: string[] = [];

    if (base64Image.length > maxChunkSize) {
      imageChunks = this.chunkBase64(base64Image, maxChunkSize);
    } else {
      imageChunks = [base64Image];
    }

    imageChunks.join('');

    return imageChunks;
  }

  @Public()
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('imageFile', 10))
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    
    return { message: "Files uploaded successfully", files };
  }


  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
