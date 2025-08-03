import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
