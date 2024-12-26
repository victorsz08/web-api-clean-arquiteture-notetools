import { Note } from "../../domain/entities/note/note.entity";
import { NoteGateway } from "../../domain/gateway/note/note.gateway";
import { Usecase } from "../usecase";




export type ListNoteInputDto = {
    userId: string;
};

export type ListNoteOutputDto = {
    notes: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export class ListNoteUsecase implements Usecase<ListNoteInputDto, ListNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new ListNoteUsecase(noteGateway);
    };
    
    public async execute({ userId } : ListNoteInputDto): Promise<ListNoteOutputDto> {
        const aNotes = await this.noteGateway.list(userId);

        const output = this.presentOutput(aNotes);

        return output;
    };

    private presentOutput(notes: Note[]): ListNoteOutputDto {
        const output: ListNoteOutputDto = {
            notes: notes.map((n) => {
                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    createdAt: n.createdAt,
                    updatedAt: n.updatedAt
                }
            })
        };

        return output;
    };
};