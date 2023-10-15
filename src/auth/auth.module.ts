import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { JwtStrategy } from 'src/auth/passport/jwt.strategy';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/auth/services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
