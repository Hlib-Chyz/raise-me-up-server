import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';
import mongoose, { Error, Model } from 'mongoose';
import {
  NoteCreationValidationException,
  NoteExistsException,
  NoteNotFoundException,
} from 'src/exceptions';
import { NoteDto } from 'src/note/dto/note.dto';
import { INote } from 'src/note/schemas/note.schema';

@Injectable()
export class NoteService {
  public constructor(@InjectModel('Note') private noteModel: Model<INote>) {}

  public async findAllByUserId(userId: string): Promise<NoteDto[]> {
    const notes = await this.noteModel.find({ owner: userId }).exec();
    if (!notes) {
      throw new NoteNotFoundException();
    }
    return notes;
  }

  public async create(noteDto: NoteDto, userId: string): Promise<string> {
    try {
      const createdNote = new this.noteModel({
        ...noteDto,
        owner: userId,
      });
      const note = await createdNote.save();
      return note._id;
    } catch (e: unknown) {
      if (e instanceof MongoServerError && e.code === 11000) {
        throw new NoteExistsException();
      } else if (e instanceof Error.ValidationError) {
        throw new NoteCreationValidationException();
      }
      throw e;
    }
  }

  public async update(id: string, updateData: NoteDto): Promise<string> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(
        id,
        updateData,
      );
      if (!updatedNote) {
        throw new NoteNotFoundException();
      }
      return updatedNote._id;
    } catch (e: unknown) {
      if (e instanceof MongoServerError && e.code === 11000) {
        throw new NoteExistsException();
      } else if (e instanceof Error.ValidationError) {
        throw new NoteCreationValidationException();
      }
      throw e;
    }
  }

  public async delete(id: string): Promise<string> {
    const result = await this.noteModel.deleteOne({ _id: id });
    if (result.deletedCount && result.deletedCount > 0) {
      return id;
    }
    throw new NoteNotFoundException();
  }

  public async isUserOwner(
    userId: mongoose.Types.ObjectId,
    noteId: string,
  ): Promise<boolean> {
    const note = await this.noteModel.findById(noteId);
    const access = note?.owner.equals(userId);
    return note && access;
  }
}
