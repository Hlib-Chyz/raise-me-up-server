import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NoteService } from 'src/note/services/note.service';

@Injectable()
export class NoteOwnerGuard implements CanActivate {
  constructor(private readonly noteService: NoteService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user._id;
    const noteId = request.params.id;
    if (!userId) {
      return false;
    }
    return this.noteService.isUserOwner(userId, noteId);
  }
}
