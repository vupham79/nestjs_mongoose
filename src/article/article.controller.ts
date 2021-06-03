import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('Article')
@Controller('article')
@UseGuards(RolesGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllArticle() {
    return await this.articleService.getAllArticles();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'id of article' })
  @ApiOkResponse({})
  async getOneArticles(@Param() params) {
    return await this.articleService.getOneArticle(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'id of article' })
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async updateWithAllParams(
    @Param() params,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articleService.updateArticlePut(
      params.id,
      createArticleDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({
    name: 'id',
    description: 'id of article we want to delete.',
  })
  @ApiOkResponse({})
  async deleteOneArticle(@Param() params) {
    return await this.articleService.deleteArticle(params.id);
  }
}
