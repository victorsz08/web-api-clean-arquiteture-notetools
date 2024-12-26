import { Note } from "../../domain/entities/note/note.entity";
import { NoteGateway } from "../../domain/gateway/note/note.gateway";
import { Usecase } from "../usecase";




export type FindNoteInputDto = {
    id: string;
};

export type FindNoteOutputDto = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindNoteUsecase implements Usecase<FindNoteInputDto, FindNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new FindNoteUsecase(noteGateway);
    };
    
    public async execute({ id } : FindNoteInputDto): Promise<FindNoteOutputDto> {
        const aNote = await this.noteGateway.find(id);

        const output = this.presentOutput(aNote);

        return output;
    };

    private presentOutput(note: Note): FindNoteOutputDto {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        };
    };
};