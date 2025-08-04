import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'

import { TokenPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: TokenPayload,
  ) {
    const userId = Number(user.sub)
    return await this.tasksService.createTask(createTaskDto, userId)
  }

  @Post('get/all/paginated')
  async findAllStaskPaginated(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @CurrentUser() user: TokenPayload,
  ) {
    const userId = Number(user.sub)

    return await this.tasksService.findAllTaskPaginated(
      pageNumber,
      pageSize,
      userId,
    )
  }

  @Get('get/all')
  async findAllTasks(@CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)

    return await this.tasksService.findAllTasks(userId)
  }

  @Get('get/:id')
  findOne(@Param('id') id: number, @CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)
    return this.tasksService.findOneTask(+id, userId)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id)
  }
}
