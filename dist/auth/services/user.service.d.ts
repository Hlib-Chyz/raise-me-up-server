import { Model } from 'mongoose';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { IUser } from 'src/auth/schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<IUser>);
    create({ registerDto, }: {
        registerDto: RegisterDto;
    }): Promise<UserDto>;
    login(loginDto: LoginDto): Promise<UserDto>;
    findByPayload(email: string): Promise<IUser>;
    sanitizeUser(user: IUser): UserDto;
}
