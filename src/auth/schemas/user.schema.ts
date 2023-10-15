import { hash } from 'bcrypt';
import { Document, Schema } from 'mongoose';
import * as mongooseValidator from 'mongoose-validator';

const passwordValidator = [
  mongooseValidator({
    validator: 'isLength',
    arguments: [6, undefined],
    message: 'Password should be at least 6 characters long',
  }),
];

const emailValidator = [
  mongooseValidator({
    validator: 'isEmail',
    message: 'Invalid email format',
  }),
];

export const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator,
  },
  password: { type: String, required: true, validate: passwordValidator },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

export interface IUser extends Document {
  readonly _id: string;
  email: string;
  password: string;
}
