import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    })

    const hashedPassword = await bcrypt.hash(createUserDto.password, 6)

    if (user !== null) {
      throw new ConflictException('E-mail já cadastrado!')
    }

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    })
  }

  async findOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: { name: updateUserDto.name },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
