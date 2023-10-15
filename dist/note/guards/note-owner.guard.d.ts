import { CanActivate, ExecutionContext } from '@nestjs/common';
import { NoteService } from 'src/note/services/note.service';
export declare class NoteOwnerGuard implements CanActivate {
    private readonly noteService;
    constructor(noteService: NoteService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
