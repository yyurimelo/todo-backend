import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'E-mail do usuário para login',
  })
  email: string;

  @ApiProperty({
    example: 'string',
    description: 'Senha do usuário',
    minLength: 6,
  })
  @IsString()
  password: string;
}
