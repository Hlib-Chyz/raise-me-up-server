import { Response } from 'express';
import { IUser } from 'src/auth/schemas/user.schema';
import { NoteDto } from 'src/note/dto/note.dto';
import { NoteService } from 'src/note/services/note.service';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    findAll(res: Response, req: {
        user: IUser;
    }): Promise<void>;
    create(noteDto: NoteDto, res: Response, req: {
        user: IUser;
    }): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
    update(id: string, noteDto: NoteDto, res: Response): Promise<void>;
}
