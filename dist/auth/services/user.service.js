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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_1 = require("bcrypt");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../../exceptions");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create({ registerDto, }) {
        try {
            const createdUser = new this.userModel(registerDto);
            await createdUser.save();
            return this.sanitizeUser(createdUser);
        }
        catch (e) {
            if (e instanceof mongodb_1.MongoServerError && e.code === 11000) {
                throw new exceptions_1.UserExistsException();
            }
            else if (e instanceof mongoose_2.Error.ValidationError) {
                throw new exceptions_1.UserCreationValidationException();
            }
            throw e;
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new exceptions_1.InvalidCredentialException();
        }
        if (await (0, bcrypt_1.compare)(password, user.password)) {
            return this.sanitizeUser(user);
        }
        throw new exceptions_1.InvalidCredentialException();
    }
    async findByPayload(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new exceptions_1.UserNotFoundException();
        }
        return user;
    }
    sanitizeUser(user) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map