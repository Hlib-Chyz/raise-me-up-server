import mongoose, { Model } from 'mongoose';
import { NoteDto } from 'src/note/dto/note.dto';
import { INote } from 'src/note/schemas/note.schema';
export declare class NoteService {
    private noteModel;
    constructor(noteModel: Model<INote>);
    findAllByUserId(userId: string): Promise<NoteDto[]>;
    create(noteDto: NoteDto, userId: string): Promise<string>;
    update(id: string, updateData: NoteDto): Promise<string>;
    delete(id: string): Promise<string>;
    isUserOwner(userId: mongoose.Types.ObjectId, noteId: string): Promise<boolean>;
}
