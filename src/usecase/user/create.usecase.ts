import { User } from "../../domain/entities/user/user.entity";
import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";





export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type CreateUserOutputDto = {
    id: string;
};


export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};


    public static build(userGateway: UserGateway) {
        return new CreateUserUsecase(userGateway);
    };
    
    public async execute({ username, firstName, lastName, password } : CreateUserInputDto): Promise<CreateUserOutputDto> {
        const aUser = User.build(username, firstName, lastName, password);

        await this.userGateway.save(aUser);

        const output = this.presentOutput(aUser);

        return output;
    };

    private presentOutput(user: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: user.id
        };

        return output;
    }
}