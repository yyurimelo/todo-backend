import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.usersService.findOneUser(+id);
  }

  @Put('update')
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(+id, updateUserDto);
  }
}
