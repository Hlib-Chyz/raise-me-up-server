"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../exceptions");
let ErrorFilter = class ErrorFilter {
    catch(exception, host) {
        console.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof exceptions_1.UserExistsException ||
            exception instanceof exceptions_1.NoteExistsException) {
            response.status(common_1.HttpStatus.CONFLICT).json({
                message: exception.message,
            });
        }
        else if (exception instanceof exceptions_1.UserCreationValidationException ||
            exception instanceof exceptions_1.InvalidCredentialException ||
            exception instanceof exceptions_1.NoteCreationValidationException) {
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: exception.message,
            });
        }
        else if (exception instanceof exceptions_1.InternalServerErrorException) {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: exception.message,
            });
        }
        else if (exception instanceof exceptions_1.UserNotFoundException ||
            exception instanceof exceptions_1.NoteNotFoundException ||
            exception instanceof common_1.NotFoundException) {
            response.status(common_1.HttpStatus.NOT_FOUND).json({
                message: exception.message,
            });
        }
        else if (exception instanceof exceptions_1.UserAccessException ||
            exception instanceof common_1.UnauthorizedException ||
            exception instanceof common_1.ForbiddenException) {
            response.status(common_1.HttpStatus.FORBIDDEN).json({
                message: exception.message,
            });
        }
        else if (exception instanceof common_1.BadRequestException) {
            const exceptionResponse = exception.getResponse();
            response.status(exception.getStatus()).json({
                message: exceptionResponse?.['message'],
            });
        }
        else {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
            });
        }
    }
};
exports.ErrorFilter = ErrorFilter;
exports.ErrorFilter = ErrorFilter = __decorate([
    (0, common_1.Catch)()
], ErrorFilter);
//# sourceMappingURL=error.filter.js.map