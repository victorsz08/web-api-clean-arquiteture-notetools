import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListNoteInputDto, ListNoteOutputDto, ListNoteUsecase } from "../../../../../usecase/note/list.usecase";
import { ListContractInputDto } from "../../../../../usecase/contract/list.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";



export type ListNoteResponseDto = {
    notes: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
};


export class ListNoteRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listNoteService: ListNoteUsecase
    ) {};

    public static build(listNoteService: ListNoteUsecase) {
        return new ListNoteRoute("/notes/user/:userId", HttpMethod.GET, listNoteService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;

            try {
                const input: ListNoteInputDto = {
                    userId
                };

                const data = await this.listNoteService.execute(input);

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

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse({ notes }: ListNoteOutputDto): ListNoteResponseDto {
        return {
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
    };

};