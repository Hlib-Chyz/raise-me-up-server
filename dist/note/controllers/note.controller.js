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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const note_dto_1 = require("../dto/note.dto");
const note_owner_guard_1 = require("../guards/note-owner.guard");
const note_service_1 = require("../services/note.service");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async findAll(res, req) {
        const notes = await this.noteService.findAllByUserId(req.user._id);
        res.status(common_1.HttpStatus.OK).json(notes);
    }
    async create(noteDto, res, req) {
        const noteId = await this.noteService.create(noteDto, req.user._id);
        res.status(common_1.HttpStatus.CREATED).json(noteId);
    }
    async delete(id, res) {
        const noteId = await this.noteService.delete(id);
        res.status(common_1.HttpStatus.NO_CONTENT).json(noteId);
    }
    async update(id, noteDto, res) {
        const noteId = await this.noteService.update(id, noteDto);
        res.status(common_1.HttpStatus.OK).json(noteId);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.NoteDto, Object, Object]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(note_owner_guard_1.NoteOwnerGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(note_owner_guard_1.NoteOwnerGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, note_dto_1.NoteDto, Object]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "update", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.Controller)('notes'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controller.js.map