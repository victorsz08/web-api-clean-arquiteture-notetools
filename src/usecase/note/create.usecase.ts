import { Note } from "../../domain/entities/note/note.entity";
import { NoteGateway } from "../../domain/gateway/note/note.gateway";
import { Usecase } from "../usecase";



export type CreateNoteInputDto = {
    title: string;
    content: string;
    userId: string;
};

export type CreateNoteOutputDto = {
    id: string;
};

export class CreateNoteUsecase implements Usecase<CreateNoteInputDto, CreateNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new CreateNoteUsecase(noteGateway);
    };

    public async execute({ title, content, userId } : CreateNoteInputDto): Promise<CreateNoteOutputDto> {
        const aNote = Note.build(title, content, userId);

        await this.noteGateway.save(aNote);

        const output = this.presentOutput(aNote);

        return output;
    };

    private presentOutput(note: Note): CreateNoteOutputDto {
        return {
            id: note.id
        };
    };

}