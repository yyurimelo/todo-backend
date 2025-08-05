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
  Put,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'

import { TokenPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { AuthGuard } from 'src/auth/auth.guard'
import { UpdateTaskDto } from './dto/update-task.dto'

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
    return await this.tasksService.createTaskAsync(createTaskDto, userId)
  }

  @Post('get/all/paginated')
  async findAllStaskPaginated(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @CurrentUser() user: TokenPayload,
  ) {
    const userId = Number(user.sub)

    pageNumber = Number(pageNumber) || 1
    pageSize = Number(pageSize) || 10

    return await this.tasksService.findAllTaskPaginatedAsync(
      pageNumber,
      pageSize,
      userId,
    )
  }

  @Get('get/all')
  @HttpCode(HttpStatus.OK)
  async findAllTasks(@CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)

    return await this.tasksService.findAllTasksAsync(userId)
  }

  @Get('get/:id')
  async findOne(@Param('id') id: number, @CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)
    return await this.tasksService.findOneTaskAsync(+id, userId)
  }

  @UseGuards(AuthGuard)
  @Put('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Query('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: TokenPayload,
  ) {
    const userId = Number(user.sub)

    return await this.tasksService.updateTaskAsync(+id, userId, updateTaskDto)
  }

  @Delete('remove')
  async removeTask(@Query('id') id: string, @CurrentUser() user: TokenPayload) {
    const userId = Number(user.sub)
    return await this.tasksService.removeTaskAsync(+id, userId)
  }
}
