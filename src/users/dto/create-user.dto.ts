import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  password: string
}
