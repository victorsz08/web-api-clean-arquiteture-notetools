import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateUserInputDto, UpdateUserOuputDto, UpdateUserUsecase } from "../../../../../usecase/user/update.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export type UpdateUserResponseDto = {
    id: string;
};


export class UpdateUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUsecase
    ) {};
    
    public static build(updateUserService: UpdateUserUsecase) {
        return new UpdateUserRoute("/users/:id", HttpMethod.PUT, updateUserService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { username, firstName, lastName } = request.body;
            const { id } = request.params;
            
            try {
                const input: UpdateUserInputDto = {
                    id, 
                    username,
                    firstName, 
                    lastName
                };

                const data = await this.updateUserService.execute(input);

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

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
                return new AuthMiddleware().execute();
    }

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(user: UpdateUserOuputDto): UpdateUserResponseDto {
        const output: UpdateUserResponseDto = {
            id: user.id
        };

        return output;
    };

}