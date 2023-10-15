"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccessException = exports.NoteNotFoundException = exports.InvalidCredentialException = exports.UserNotFoundException = exports.InternalServerErrorException = exports.NoteCreationValidationException = exports.UserCreationValidationException = exports.NoteExistsException = exports.UserExistsException = void 0;
class UserExistsException extends Error {
    constructor() {
        super();
        this.message = 'User already exists';
    }
}
exports.UserExistsException = UserExistsException;
class NoteExistsException extends Error {
    constructor() {
        super();
        this.message = 'Note already exists';
    }
}
exports.NoteExistsException = NoteExistsException;
class UserCreationValidationException extends Error {
    constructor() {
        super();
        this.message =
            'Email must be valid and password must have at least 6 symbols';
    }
}
exports.UserCreationValidationException = UserCreationValidationException;
class NoteCreationValidationException extends Error {
    constructor() {
        super();
        this.message = 'Title must be filled';
    }
}
exports.NoteCreationValidationException = NoteCreationValidationException;
class InternalServerErrorException extends Error {
    constructor() {
        super();
        this.message = 'Something went wrong';
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
class UserNotFoundException extends Error {
    constructor() {
        super();
        this.message = 'User not found';
    }
}
exports.UserNotFoundException = UserNotFoundException;
class InvalidCredentialException extends Error {
    constructor() {
        super();
        this.message = 'Invalid credential';
    }
}
exports.InvalidCredentialException = InvalidCredentialException;
class NoteNotFoundException extends Error {
    constructor() {
        super();
        this.message = 'Note not found';
    }
}
exports.NoteNotFoundException = NoteNotFoundException;
class UserAccessException extends Error {
    constructor() {
        super();
        this.message = 'User does not have access to the note';
    }
}
exports.UserAccessException = UserAccessException;
//# sourceMappingURL=exceptions.js.map