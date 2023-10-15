import mongoose, { Document } from 'mongoose';
export declare const NoteSchema: mongoose.Schema<INote, mongoose.Model<INote, any, any, any, mongoose.Document<unknown, any, INote> & INote & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, INote, mongoose.Document<unknown, {}, mongoose.FlatRecord<INote>> & mongoose.FlatRecord<INote> & Required<{
    _id: string;
}>>;
export interface INote extends Document {
    readonly _id: string;
    title: string;
    owner: mongoose.Types.ObjectId;
}
