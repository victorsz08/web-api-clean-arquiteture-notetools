import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindNoteInputDto, FindNoteOutputDto, FindNoteUsecase } from "../../../../../usecase/note/find.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";



export type FindNoteResponseDto = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findNoteService: FindNoteUsecase
    ) {};

    public static build(findNoteService: FindNoteUsecase) {
        return new FindNoteRoute("/notes/:id", HttpMethod.GET, findNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: FindNoteInputDto = {
                    id
                };

                const data = await this.findNoteService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode }).send();
                };
                
                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            }
        }
    };

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
        return new AuthMiddleware().execute();
    }

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(note: FindNoteOutputDto): FindNoteResponseDto {
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