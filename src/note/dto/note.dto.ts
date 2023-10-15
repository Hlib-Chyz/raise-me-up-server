import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class NoteDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;
  owner?: mongoose.Types.ObjectId;
}
