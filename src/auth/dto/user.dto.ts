import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  _id: string;
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;
}
