import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListUserInputDto, ListUserOutputDto, ListUserUsecase } from "../../../../../usecase/user/list.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";



export type ListUserResponseDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
};


export class ListUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase
    ) {};

    public static build(listUserService: ListUserUsecase) {
        return new ListUserRoute("/users", HttpMethod.GET, listUserService);
    };

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
            return new AuthMiddleware().execute();
    }
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { search } = request.query;

            try {
                const input: ListUserInputDto = {
                    search: search?.toString()
                };

                const data = await this.listUserService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof UserExceptions) {
                    return response.status(404).json({ error: error.message, statusCode: 404 }).send();
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

    private presentResponse({ users } : ListUserOutputDto): ListUserResponseDto {
        const output: ListUserResponseDto = {
            users: users.map((u) => {
                return {
                    id: u.id,
                    username: u.username,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    isAdmin: u.isAdmin,
                    createdAt: u.createdAt,
                    updatedAt: u.updatedAt
                }
            })
        };

        return output;
    }
    
}