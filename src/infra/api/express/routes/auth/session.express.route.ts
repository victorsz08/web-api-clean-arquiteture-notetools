import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { SessionInputDto, SessionOutputDto, SessionUsecase } from "../../../../../usecase/session/session.usecase";
import { User } from "../../../../../domain/entities/user/user.entity";
import { UserExceptions } from "../../../../../package/exceptions/user.exceptions.error";




export type SessionResponseDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
};


export class SessionRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly sessionService: SessionUsecase
    ) {};

    public static build(sessionService: SessionUsecase) {
        return new SessionRoute("/session", HttpMethod.GET, sessionService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const token = request.headers.authorization;

            try {
                if(!token) {
                    return response.status(400).json({ message: "token not found", statusCode: 400 }).send();
                };

                const [_beader, accessToken] = token.split(" ");

                const input: SessionInputDto = {
                    token: accessToken
                };

                const data = await this.sessionService.execute(input);

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

    private presentResponse(user: SessionOutputDto): SessionResponseDto {
        const output: SessionResponseDto = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
        };

        return output;
    };

}