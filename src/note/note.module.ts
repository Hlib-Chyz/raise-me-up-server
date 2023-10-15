import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from 'src/note/controllers/note.controller';
import { NoteSchema } from 'src/note/schemas/note.schema';
import { NoteService } from 'src/note/services/note.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
