import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskDto } from './dto/update-task.dto'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { TaskDto } from './dto/task-dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTaskAsync(createTaskDto: CreateTaskDto, userId: number) {
    await this.prisma.task.create({
      data: {
        ownerId: userId,
        ...createTaskDto,
      },
    })
  }

  async findAllTasksAsync(userId: number): Promise<TaskDto[]> {
    return await this.prisma.task.findMany({
      where: { ownerId: userId, deletedAt: null },
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

  async findAllTaskPaginatedAsync(
    pageNumber: number,
    pageSize: number,
    userId: number,
  ): Promise<TaskDto[]> {
    pageNumber = pageNumber < 1 ? 1 : pageNumber
    pageSize = pageSize < 1 ? 10 : pageSize

    return await this.prisma.task.findMany({
      where: { ownerId: userId, deletedAt: null },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      orderBy: {
        createdAt: 'desc',
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
  }

  async findOneTaskAsync(id: number, userId: number): Promise<TaskDto> {
    const task = await this.prisma.task.findFirst({
      where: {
        ownerId: userId,
        deletedAt: null,
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

  async updateTaskAsync(
    id: number,
    userId: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.prisma.task.findFirst({
      where: {
        ownerId: userId,
        deletedAt: null,
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

    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        name: updateTaskDto.name,
        description: updateTaskDto.description,
        isCompleted: updateTaskDto.isCompleted,
      },
    })
  }

  async removeTaskAsync(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
        ownerId: userId,
        deletedAt: null,
      },
    })

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }

    return await this.prisma.task.update({
      where: {
        id,
        ownerId: userId,
      },
      data: { deletedAt: new Date() },
    })
  }
}
