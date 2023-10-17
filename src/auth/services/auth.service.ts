import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IPayload } from 'src/auth/interfaces/payload';
import { IUser } from 'src/auth/schemas/user.schema';
import { UserService } from 'src/auth/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async signPayload(payload: IPayload): Promise<string> {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '60m' });
  }

  public async validateUser(email: string): Promise<IUser> {
    return await this.userService.findByPayload(email);
  }
}
