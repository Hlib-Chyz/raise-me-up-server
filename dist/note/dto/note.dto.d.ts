import mongoose from 'mongoose';
export declare class NoteDto {
    title: string;
    owner?: mongoose.Types.ObjectId;
}
