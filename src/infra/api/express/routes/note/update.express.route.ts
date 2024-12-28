import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateNoteInputDto, UpdateNoteOutputDto, UpdateNoteUsecase } from "../../../../../usecase/note/update.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export type UpdateNoteResponseDto = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};


export class UpdateNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateNoteService: UpdateNoteUsecase
    ) {};

    public static build(updateNoteService: UpdateNoteUsecase) {
        return new UpdateNoteRoute("/notes/:id", HttpMethod.PUT, updateNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { title, content } = request.body;

            try {
                const input: UpdateNoteInputDto = {
                    id,
                    title,
                    content
                };

                const data = await this.updateNoteService.execute(input);

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

    private presentResponse(data: UpdateNoteOutputDto): UpdateNoteResponseDto {
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};