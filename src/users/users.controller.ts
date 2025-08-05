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
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { TokenPayload } from 'src/auth/jwt.strategy'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUserAsync(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number, @CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)

    if (userId !== id) {
      throw new UnauthorizedException()
    }

    return await this.usersService.findOneUserAsync(+id)
  }

  @UseGuards(AuthGuard)
  @Put('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Query('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: TokenPayload,
  ) {
    const userId = Number(user.sub)

    if (userId !== id) {
      throw new UnauthorizedException()
    }

    return await this.usersService.updateUserAsync(+id, updateUserDto)
  }
}
