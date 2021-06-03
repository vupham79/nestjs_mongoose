import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/v1/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // @Post('verify-email')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({})
  // async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
  //   return await this.userService.verifyEmail(req, verifyUuidDto);
  // }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(req, loginUserDto);
  }

  // @Get('data')
  // @UseGuards(AuthGuard('jwt'))
  // @Roles('admin')
  // @ApiBearerAuth()
  // @ApiHeader({
  //   name: 'Bearer',
  //   description: 'the token we need for auth.',
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({})
  // findAll() {
  //   return this.userService.findAll();
  // }
}
