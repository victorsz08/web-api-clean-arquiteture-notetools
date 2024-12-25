import { LoginGateway } from "../../domain/gateway/login/login.gateway";
import { Usecase } from "../usecase";



export type LoginInputDto = {
    username: string;
    password: string;
};


export type LoginOutputDto = {
    token: string;
};


export class LoginUsecase implements Usecase<LoginInputDto, LoginOutputDto> {
    
    private constructor(private readonly loginGateway: LoginGateway) {};

    public static build(loginGateway: LoginGateway) {
        return new LoginUsecase(loginGateway);
    };
    
    public async execute({ username, password } : LoginInputDto): Promise<LoginOutputDto> {
        const token = await this.loginGateway.auth(username, password);

        const output = this.presentOutput(token);

        return output;
    };

    private presentOutput(token: string): LoginOutputDto  {
        const output: LoginOutputDto = {
            token
        };

        return output;
    };
};