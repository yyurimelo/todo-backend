import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateTaskDto {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  description: string

  @ApiProperty({
    example: '04/08/2025',
  })
  @IsString()
  isCompleted: string
}
