import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601, IsOptional, IsString } from 'class-validator'

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

  @ApiProperty({ example: '2025-08-04T00:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  isCompleted?: Date
}
