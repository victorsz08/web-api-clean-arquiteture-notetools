import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ResetPasswordInputDto, ResetPasswordOutputDto, ResetPasswordUsecase } from "../../../../../usecase/user/reset-password.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";




export type ResetPasswordResponseDto = {
    password: string;
};


export class ResetPasswordRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly resetPasswordService: ResetPasswordUsecase
    ) {};

    public static build(resetPasswordService: ResetPasswordUsecase) {
        return new ResetPasswordRoute("/users/resetpassword/:id", HttpMethod.POST, resetPasswordService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: ResetPasswordInputDto = {
                    id
                };

                const data = await this.resetPasswordService.execute(input);

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

    private presentResponse({ password }: ResetPasswordOutputDto): ResetPasswordResponseDto {
        const output: ResetPasswordResponseDto = {
            password
        };

        return output;
    } 

}