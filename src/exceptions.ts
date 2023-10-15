export class UserExistsException extends Error {
  public constructor() {
    super();
    this.message = 'User already exists';
  }
}

export class NoteExistsException extends Error {
  public constructor() {
    super();
    this.message = 'Note already exists';
  }
}

export class UserCreationValidationException extends Error {
  public constructor() {
    super();
    this.message =
      'Email must be valid and password must have at least 6 symbols';
  }
}

export class NoteCreationValidationException extends Error {
  public constructor() {
    super();
    this.message = 'Title must be filled';
  }
}

export class InternalServerErrorException extends Error {
  public constructor() {
    super();
    this.message = 'Something went wrong';
  }
}

export class UserNotFoundException extends Error {
  public constructor() {
    super();
    this.message = 'User not found';
  }
}

export class InvalidCredentialException extends Error {
  public constructor() {
    super();
    this.message = 'Invalid credential';
  }
}

export class NoteNotFoundException extends Error {
  public constructor() {
    super();
    this.message = 'Note not found';
  }
}

export class UserAccessException extends Error {
  public constructor() {
    super();
    this.message = 'User does not have access to the note';
  }
}
