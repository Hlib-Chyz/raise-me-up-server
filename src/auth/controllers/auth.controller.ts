import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { IUser } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/auth/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public getProfile(
    @Request() req: { user: IUser },
    @Res() res: Response,
  ): void {
    const user: UserDto = this.userService.sanitizeUser(req.user);
    res.status(HttpStatus.OK).json(user);
  }

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.userService.create({ registerDto });
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    res.status(HttpStatus.CREATED).json({ user, token });
  }

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.userService.login(loginDto);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    res.status(HttpStatus.OK).json({ user, token });
  }
}
