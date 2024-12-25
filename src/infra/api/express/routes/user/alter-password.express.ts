import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { AlterPasswordInputDto, AlterPasswordUsecase } from "../../../../../usecase/user/alter-password.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";




export class AlterPasswordRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly alterPasswordService: AlterPasswordUsecase
    ) {};
    
    public static build(alterPasswordService: AlterPasswordUsecase) {
        return new AlterPasswordRoute("/users/alterpassword/:id", HttpMethod.PUT, alterPasswordService);
    }

    getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { currentPassword, newPassword } = request.body;

            try {
                const input: AlterPasswordInputDto = {
                    id, 
                    currentPassword, 
                    newPassword
                };

                const data = await this.alterPasswordService.execute(input);

                return response.status(200).json({ message: "ok" }).send();
            } catch (error) {
                if(error instanceof UserExceptions) {
                    return response.status(401).json({ error: error.message }).send();
                };

                return response.status(500).json({ error: "server internal error" }).send();
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