import { Note } from "../../domain/entities/note/note.entity";
import { NoteGateway } from "../../domain/gateway/note/note.gateway";
import { Usecase } from "../usecase";


export type UpdateNoteInputDto = {
    id: string;
    title: string;
    content: string;
};

export type UpdateNoteOutputDto = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class UpdateNoteUsecase implements Usecase<UpdateNoteInputDto, UpdateNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new UpdateNoteUsecase(noteGateway);
    };
    
    public async execute({ id, title, content } : UpdateNoteInputDto): Promise<UpdateNoteOutputDto> {
        const aNote = await this.noteGateway.update(id, title, content);

        const output = this.presentOutput(aNote);

        return output;
    };

    private presentOutput(note: Note): UpdateNoteOutputDto {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        };
    };
}