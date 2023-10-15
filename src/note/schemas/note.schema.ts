import mongoose, { Document, Schema } from 'mongoose';
import * as mongooseValidator from 'mongoose-validator';

const titleValidator = [
  mongooseValidator({
    validator: 'isLength',
    arguments: [1, undefined],
    message: 'Field should not be empty',
  }),
];

export const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    unique: true,
    required: true,
    validate: titleValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export interface INote extends Document {
  readonly _id: string;
  title: string;
  owner: mongoose.Types.ObjectId;
}
