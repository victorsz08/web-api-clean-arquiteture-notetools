import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindUserInputDto, FindUserOutputDto, FindUserUsecase } from "../../../../../usecase/user/find.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";



export type FindUserResponseDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};


export class FindUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findUserService: FindUserUsecase
    ) {};

    public static build(findUserService: FindUserUsecase) {
        return new FindUserRoute("/users/:id", HttpMethod.GET, findUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: FindUserInputDto = {
                    id
                };

                const data = await this.findUserService.execute(input);

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

    private presentResponse(user: FindUserOutputDto): FindUserResponseDto {
        const output: FindUserResponseDto = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return output;
    };
};