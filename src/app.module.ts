import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://admin:aCGVGLcljTEwpMr5@cluster0.aecrutf.mongodb.net/?retryWrites=true&w=majority',
      {},
    ),
    NoteModule,
    AuthModule,
  ],
})
export class AppModule {}
