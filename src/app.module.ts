import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'

@Module({
  imports: [
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
