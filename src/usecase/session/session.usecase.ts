import { User } from "../../domain/entities/user/user.entity";
import { SessionGateway } from "../../domain/gateway/session/session.gateway";
import { Usecase } from "../usecase";




export type SessionInputDto = {
    token: string;
};


export type SessionOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
};


export class SessionUsecase implements Usecase<SessionInputDto, SessionOutputDto> {
    
    private constructor(private readonly sessionGateway: SessionGateway) {};
    
    public static build(sessionGateway: SessionGateway) {
        return new SessionUsecase(sessionGateway);
    };

    public async execute(input: SessionInputDto): Promise<SessionOutputDto> {
        const user = await this.sessionGateway.session(input.token);

        const output = this.presentOutput(user);

        return output;
    };

    private presentOutput(user: User): SessionOutputDto {
        const output: SessionOutputDto = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
        };

        return output;
    };

}