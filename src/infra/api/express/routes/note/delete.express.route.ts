import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteNoteInputDto, DeleteNoteUsecase } from "../../../../../usecase/note/delete.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export class DeleteNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteNoteService: DeleteNoteUsecase
    ) {};

    public static build(deleteNoteService: DeleteNoteUsecase) {
        return new DeleteNoteRoute("/notes/:id", HttpMethod.DELETE, deleteNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: DeleteNoteInputDto = {
                    id
                };

                await this.deleteNoteService.execute(input);

                return response.status(200).json({ message: "OK!" }).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode }).send();
                };
                
                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            };
        };
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

};