import { PrismaClient } from "@prisma/client";
import { Note } from "../../../domain/entities/note/note.entity";
import { NoteGateway } from "../../../domain/gateway/note/note.gateway";
import { NotFoundException } from "../../../package/exceptions/error.request.exception";



export class NoteRepositoryPrisma implements NoteGateway {
    
    private constructor(private readonly repository: PrismaClient) {};
    
    public static build(repository: PrismaClient) {
        return new NoteRepositoryPrisma(repository);
    };
    
    public async save({ id, title, content, userId, createdAt, updatedAt } : Note): Promise<void> {
      const user = await this.repository.user.findUnique({ where: { id: userId }});
      
      if(!user) {
        throw new NotFoundException("user not found with id");
      };

      const note = await this.repository.note.create({
        data: {
            id,
            title,
            content,
            user: {
                connect: {
                    id: user.id
                }
            },
            createdAt,
            updatedAt
        }
      });

      return;
    };


    public async list(userId: string): Promise<Note[]> {
        const notes = await this.repository.note.findMany({ where: { user: { id: userId }}});

        if(notes.length === 0) {
            throw new NotFoundException("notes not found");
        };

        const notesList = notes.map((n) => {
            return Note.with({
                id: n.id,
                title: n.title,
                content: n.content,
                userId: n.userId,
                createdAt: n.createdAt,
                updatedAt: n.updatedAt
            })
        });

        return notesList;
    };

    public async find(id: string): Promise<Note> {
        const note = await this.repository.note.findUnique({ where: { id }});

        if(!note) {
            throw new NotFoundException("note not found with id");
        };

        return Note.with({
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    };

    public async update(id: string, title: string, content: string): Promise<Note> {
        const note = await this.repository.note.update({
            where: {
                id
            },
            data: {
                title, 
                content,
                updatedAt: new Date()
            }
        });

        if(!note) {
            throw new NotFoundException("note not found with id");
        };

        return Note.with({
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        });
    };

    public async delete(id: string): Promise<void> {
        const note = await this.find(id);

        await this.repository.note.delete({ where: { id: note.id }});

        return;
    };
}