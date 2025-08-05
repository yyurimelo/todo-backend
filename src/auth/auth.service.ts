import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in-dto'
import { JwtService } from '@nestjs/jwt'
import { AuthResponseDto } from './dto/auth-response-dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInAsync(signInDto: SignInDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findUserByEmailAsync(signInDto.email)

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const token = await this.jwtService.sign({ sub: user.id })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }
}
