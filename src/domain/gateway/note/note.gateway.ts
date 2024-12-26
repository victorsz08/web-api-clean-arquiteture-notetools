import { Note } from "../../entities/note/note.entity";


export interface NoteGateway {
    save(note: Note): Promise<void>;
    list(userId: string): Promise<Note[]>;
    find(id: string): Promise<Note>;
    update(id: string, title: string, content: string): Promise<Note>;
    delete(id: string): Promise<void>;
};