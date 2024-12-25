import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";



export type ResetPasswordInputDto = {
    id: string;
};


export type ResetPasswordOutputDto = {
    password: string;
};


export class ResetPasswordUsecase implements Usecase<ResetPasswordInputDto, ResetPasswordOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new ResetPasswordUsecase(userGateway);
    };
    
    public async execute({ id } : ResetPasswordInputDto): Promise<ResetPasswordOutputDto> {
        const password = await this.userGateway.resetPassword(id);

        const output = this.presentOutput(password);

        return output;
    };


    private presentOutput(password: string): ResetPasswordOutputDto {
        const output: ResetPasswordOutputDto = {
            password: password
        };

        return output;
    };
};