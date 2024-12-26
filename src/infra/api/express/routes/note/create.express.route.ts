import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateNoteInputDto, CreateNoteOutputDto, CreateNoteUsecase } from "../../../../../usecase/note/create.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";



export type CreateNoteResponseDto = {
    id: string;
};


export class CreateNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createNoteService: CreateNoteUsecase
    ) {};

    public static build(createNoteService: CreateNoteUsecase) {
        return new CreateNoteRoute("/notes/:userId", HttpMethod.POST, createNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;
            const { title, content } = request.body;

            try {
                const input: CreateNoteInputDto = {
                    title,
                    content,
                    userId
                };

                const data = await this.createNoteService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(201).json(responseBody).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode }).send();
                };

                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            };
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(note: CreateNoteOutputDto): CreateNoteResponseDto {
        return {
            id: note.id
        };
    };
};