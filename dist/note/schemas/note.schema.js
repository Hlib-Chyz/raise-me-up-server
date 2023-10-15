"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose_1 = require("mongoose");
const mongooseValidator = require("mongoose-validator");
const titleValidator = [
    mongooseValidator({
        validator: 'isLength',
        arguments: [1, undefined],
        message: 'Field should not be empty',
    }),
];
exports.NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        validate: titleValidator,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
//# sourceMappingURL=note.schema.js.map