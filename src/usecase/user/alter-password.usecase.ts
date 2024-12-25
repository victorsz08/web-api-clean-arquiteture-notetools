import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";





export type AlterPasswordInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

export type AlterPasswordOutputDto = void;


export class AlterPasswordUsecase implements Usecase<AlterPasswordInputDto, AlterPasswordOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new AlterPasswordUsecase(userGateway);
    }
    
    public async execute({ id, currentPassword, newPassword } : AlterPasswordInputDto): Promise<void> {
        await this.userGateway.alterPassword(id, currentPassword, newPassword);

        return;
    }

}