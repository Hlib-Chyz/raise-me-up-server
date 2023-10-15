"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const mongooseValidator = require("mongoose-validator");
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
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: emailValidator,
    },
    password: { type: String, required: true, validate: passwordValidator },
});
exports.UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await (0, bcrypt_1.hash)(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map