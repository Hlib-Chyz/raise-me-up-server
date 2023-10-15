import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { IUser } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/auth/services/user.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    getProfile(req: {
        user: IUser;
    }, res: Response): void;
    register(registerDto: RegisterDto, res: Response): Promise<void>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
}
