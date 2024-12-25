import { User } from "../../domain/entities/user/user.entity";
import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { Usecase } from "../usecase";




export type ListUserInputDto = {
    search?: string;
};

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
};


export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    
    private constructor(private readonly userGateway: UserGateway) {};

    public static build(userGateway: UserGateway) {
        return new ListUserUsecase(userGateway);
    }
    
    public async execute({ search } : ListUserInputDto): Promise<ListUserOutputDto> {
        const aUsers = await this.userGateway.list(search);

        const output = this.presentOutput(aUsers);

        return output;
    };


    private presentOutput(users: User[]): ListUserOutputDto {
        const output: ListUserOutputDto = {
            users: users.map((u) => {
                return {
                    id: u.id,
                    username: u.username,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    isAdmin: u.isAdmin,
                    createdAt: u.createdAt,
                    updatedAt: u.updatedAt
                }
            })
        };

        return output;
    }

}