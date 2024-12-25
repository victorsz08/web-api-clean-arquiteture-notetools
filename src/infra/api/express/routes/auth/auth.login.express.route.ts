import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { LoginInputDto, LoginOutputDto, LoginUsecase } from "../../../../../usecase/login/login.usecase";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";





export type LoginResponseDto = {
    token: string;
};


export class LoginAuthRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly loginService: LoginUsecase
    ) {};

    public static build(loginService: LoginUsecase) {
        return new LoginAuthRoute("/auth/login", HttpMethod.POST, loginService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { username, password } = request.body;

            try {
                const input: LoginInputDto = {
                    username,
                    password
                };

                const data = await this.loginService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof UserExceptions) {
                    return response.status(400).json({ error: error.message, statusCode: 400 }).send();
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

    private presentResponse({ token }: LoginOutputDto): LoginResponseDto {
        const output: LoginResponseDto = {
            token
        };

        return output;
    };
};