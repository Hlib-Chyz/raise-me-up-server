import { IPayload } from 'src/auth/interfaces/payload';
import { IUser } from 'src/auth/schemas/user.schema';
import { UserService } from 'src/auth/services/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: IPayload): Promise<string>;
    validateUser(email: string): Promise<IUser>;
}
