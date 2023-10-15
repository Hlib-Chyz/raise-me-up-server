import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  UserCreationValidationException,
  InternalServerErrorException,
  UserNotFoundException,
  InvalidCredentialException,
  NoteNotFoundException,
  NoteExistsException,
  NoteCreationValidationException,
  UserAccessException,
  UserExistsException,
} from 'src/exceptions';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (
      exception instanceof UserExistsException ||
      exception instanceof NoteExistsException
    ) {
      response.status(HttpStatus.CONFLICT).json({
        message: exception.message,
      });
    } else if (
      exception instanceof UserCreationValidationException ||
      exception instanceof InvalidCredentialException ||
      exception instanceof NoteCreationValidationException
    ) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: exception.message,
      });
    } else if (exception instanceof InternalServerErrorException) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    } else if (
      exception instanceof UserNotFoundException ||
      exception instanceof NoteNotFoundException ||
      exception instanceof NotFoundException
    ) {
      response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
      });
    } else if (
      exception instanceof UserAccessException ||
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      response.status(HttpStatus.FORBIDDEN).json({
        message: exception.message,
      });
    } else if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse() as object;
      response.status(exception.getStatus()).json({
        message: exceptionResponse?.['message'],
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
      });
    }
  }
}
