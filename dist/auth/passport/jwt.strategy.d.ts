import { Strategy } from 'passport-jwt';
import { IPayload } from 'src/auth/interfaces/payload';
import { IUser } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: IPayload): Promise<IUser>;
}
export {};
