import { User } from "../../domain/entities/user/user.entity";
import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";



export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};


export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new FindUserUsecase(userGateway);
    }
    
    public async execute({ id } : FindUserInputDto): Promise<FindUserOutputDto> {
        const aUser = await this.userGateway.find(id);

        const output = this.presentOutput(aUser);

        return output;
    };


    private presentOutput(user: User): FindUserOutputDto {
        const output: FindUserOutputDto = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return output;
    }

}