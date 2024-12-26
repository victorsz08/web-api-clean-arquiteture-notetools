import { NoteGateway } from "../../domain/gateway/note/note.gateway";
import { Usecase } from "../usecase";




export type DeleteNoteInputDto = {
    id: string;
};

export type DeleteNoteOutputDto = void;


export class DeleteNoteUsecase implements Usecase<DeleteNoteInputDto, DeleteNoteOutputDto> {
    
    private constructor(private readonly noteGateway: NoteGateway) {};

    public static build(noteGateway: NoteGateway) {
        return new DeleteNoteUsecase(noteGateway);
    }
    
    public async execute({ id } : DeleteNoteInputDto): Promise<void> {
        await this.noteGateway.delete(id);

        return;
    }

}