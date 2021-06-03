import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { SignDocumentDto } from './dto/sign-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('api/v1/documents')
@ApiTags('Document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  @Post()
  create(@Request() req, @Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto, req.user);
  }

  @Get('list')
  findAll() {
    return this.documentService.findAll();
  }

  @Get('')
  findOne(@Query('id') id: string, @Query('secret') secret: string) {
    return this.documentService.findOne(id, secret);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign')
  signDocument(@Body() signDocumentDto: SignDocumentDto) {
    return this.documentService.signDocument(signDocumentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}
