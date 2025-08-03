import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
