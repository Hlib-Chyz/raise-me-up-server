import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { MongoServerError } from 'mongodb';
import { Error, Model } from 'mongoose';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { IUser } from 'src/auth/schemas/user.schema';
import {
  InvalidCredentialException,
  UserCreationValidationException,
  UserExistsException,
  UserNotFoundException,
} from 'src/exceptions';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  public async create({
    registerDto,
  }: {
    registerDto: RegisterDto;
  }): Promise<UserDto> {
    try {
      const createdUser = new this.userModel(registerDto);
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    } catch (e: unknown) {
      if (e instanceof MongoServerError && e.code === 11000) {
        throw new UserExistsException();
      } else if (e instanceof Error.ValidationError) {
        throw new UserCreationValidationException();
      }
      throw e;
    }
  }

  public async login(loginDto: LoginDto): Promise<UserDto> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new InvalidCredentialException();
    }
    if (await compare(password, user.password)) {
      return this.sanitizeUser(user);
    }
    throw new InvalidCredentialException();
  }

  public async findByPayload(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public sanitizeUser(user: IUser): UserDto {
    const sanitized: IUser = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
