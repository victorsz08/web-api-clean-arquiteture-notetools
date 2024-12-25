import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUsecase } from "../../../../../usecase/user/create.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";




export type CreateUserResponseDto = {
    id: string;
};


export class CreateUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) {};
    
    public static build(createUserService: CreateUserUsecase) {
        return new CreateUserRoute("/users", HttpMethod.POST, createUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { username, firstName, lastName, password } = request.body;

            try {
                const input: CreateUserInputDto = {
                    username,
                    firstName,
                    lastName,
                    password
                };

                const data = await this.createUserService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(201).json(responseBody).send();
            } catch (error) {
                if(error instanceof UserExceptions) {
                    return response.status(409).json({ error: error.message, statusCode: 409 }).send();
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

    private presentResponse(user: CreateUserOutputDto): CreateUserResponseDto {
        const output: CreateUserResponseDto = {
            id: user.id
        };

        return output;
    }

}