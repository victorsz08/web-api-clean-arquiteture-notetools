import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";



export type DeleteUserInputDto = {
    id: string;
};

export type DeleteUserOutputDto = void;


export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new DeleteUserUsecase(userGateway);
    }

    public async execute({ id } : DeleteUserInputDto): Promise<void> {
        await this.userGateway.find(id);

        await this.userGateway.delete(id);

        return;
    };

};