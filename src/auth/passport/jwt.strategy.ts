import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from 'src/auth/interfaces/payload';
import { IUser } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '123',
    });
  }

  public async validate(payload: IPayload): Promise<IUser> {
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
