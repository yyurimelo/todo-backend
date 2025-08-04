import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskDto } from './dto/update-task.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { TaskDto } from './dto/task-dto'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    await this.prisma.task.create({
      data: {
        ownerId: userId,
        ...createTaskDto,
      },
    })
  }

  async findAllTasks(userId: number): Promise<TaskDto[]> {
    return await this.prisma.task.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        isCompleted: true,
        endDateTime: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async findAllTaskPaginated(
    pageNumber: number,
    pageSize: number,
    userId: number,
  ): Promise<TaskDto[]> {
    return await this.prisma.task.findMany({
      where: { ownerId: userId },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      select: {
        id: true,
        name: true,
        description: true,
        isCompleted: true,
        endDateTime: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async findOneTask(id: number, userId: number): Promise<TaskDto> {
    const task = await this.prisma.task.findFirst({
      where: {
        ownerId: userId,
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        isCompleted: true,
        endDateTime: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }

    return task
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`
  // }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
