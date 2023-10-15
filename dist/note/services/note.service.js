"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../../exceptions");
let NoteService = class NoteService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    async findAllByUserId(userId) {
        const notes = await this.noteModel.find({ owner: userId }).exec();
        if (!notes) {
            throw new exceptions_1.NoteNotFoundException();
        }
        return notes;
    }
    async create(noteDto, userId) {
        try {
            const createdNote = new this.noteModel({
                ...noteDto,
                owner: userId,
            });
            const note = await createdNote.save();
            return note._id;
        }
        catch (e) {
            if (e instanceof mongodb_1.MongoServerError && e.code === 11000) {
                throw new exceptions_1.NoteExistsException();
            }
            else if (e instanceof mongoose_2.Error.ValidationError) {
                throw new exceptions_1.NoteCreationValidationException();
            }
            throw e;
        }
    }
    async update(id, updateData) {
        try {
            const updatedNote = await this.noteModel.findByIdAndUpdate(id, updateData);
            if (!updatedNote) {
                throw new exceptions_1.NoteNotFoundException();
            }
            return updatedNote._id;
        }
        catch (e) {
            if (e instanceof mongodb_1.MongoServerError && e.code === 11000) {
                throw new exceptions_1.NoteExistsException();
            }
            else if (e instanceof mongoose_2.Error.ValidationError) {
                throw new exceptions_1.NoteCreationValidationException();
            }
            throw e;
        }
    }
    async delete(id) {
        const result = await this.noteModel.deleteOne({ _id: id });
        if (result.deletedCount && result.deletedCount > 0) {
            return id;
        }
        throw new exceptions_1.NoteNotFoundException();
    }
    async isUserOwner(userId, noteId) {
        const note = await this.noteModel.findById(noteId);
        const access = note?.owner.equals(userId);
        return note && access;
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Note')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NoteService);
//# sourceMappingURL=note.service.js.map