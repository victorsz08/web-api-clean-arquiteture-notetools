import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteUserInputDto, DeleteUserUsecase } from "../../../../../usecase/user/delete.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";





export class DeleteUserRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUsecase
    ) {};
    
    public static build(deleteUserService: DeleteUserUsecase) {
        return new DeleteUserRoute("/users/:id", HttpMethod.DELETE, deleteUserService);
    };

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;


            try {
                const input: DeleteUserInputDto = {
                    id
                };

                await this.deleteUserService.execute(input);


                return response.status(200).json({ message: "ok" }).send();
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
};