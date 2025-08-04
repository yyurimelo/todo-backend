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
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOneUser(+id)
  }

  @UseGuards(AuthGuard)
  @Put('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(+id, updateUserDto)
  }
}
