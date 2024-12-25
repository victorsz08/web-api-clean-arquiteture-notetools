import { User } from "../../domain/entities/user/user.entity";
import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";



export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type UpdateUserOuputDto = {
    id: string;
};


export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOuputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new UpdateUserUsecase(userGateway);
    };
    
    public async execute({ id, username, firstName, lastName } : UpdateUserInputDto): Promise<UpdateUserOuputDto> {
        const aUser = await this.userGateway.find(id);

        await this.userGateway.update(id, username, firstName, lastName);


        const output = this.presenOutput(aUser);

        return output;
    };


    private presenOutput(user: User): UpdateUserOuputDto {
        const output: UpdateUserOuputDto = {
            id: user.id
        };

        return output;
    };
};