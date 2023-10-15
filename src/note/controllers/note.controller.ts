import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { IUser } from 'src/auth/schemas/user.schema';
import { NoteDto } from 'src/note/dto/note.dto';
import { NoteOwnerGuard } from 'src/note/guards/note-owner.guard';
import { NoteService } from 'src/note/services/note.service';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
  public constructor(private readonly noteService: NoteService) {}

  @Get()
  public async findAll(
    @Res() res: Response,
    @Request() req: { user: IUser },
  ): Promise<void> {
    const notes: NoteDto[] = await this.noteService.findAllByUserId(
      req.user._id,
    );
    res.status(HttpStatus.OK).json(notes);
  }

  @Post()
  public async create(
    @Body() noteDto: NoteDto,
    @Res() res: Response,
    @Request() req: { user: IUser },
  ): Promise<void> {
    const noteId = await this.noteService.create(noteDto, req.user._id);
    res.status(HttpStatus.CREATED).json(noteId);
  }

  @Delete(':id')
  @UseGuards(NoteOwnerGuard)
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const noteId = await this.noteService.delete(id);
    res.status(HttpStatus.NO_CONTENT).json(noteId);
  }

  @Put(':id')
  @UseGuards(NoteOwnerGuard)
  public async update(
    @Param('id') id: string,
    @Body() noteDto: NoteDto,
    @Res() res: Response,
  ): Promise<void> {
    const noteId = await this.noteService.update(id, noteDto);
    res.status(HttpStatus.OK).json(noteId);
  }
}
