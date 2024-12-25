import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/user/user.entity";
import { SessionGateway } from "../../../domain/gateway/session/session.gateway";
import { decode } from "jsonwebtoken";
import { UserExceptions } from "../../../package/exceptions/user.exceptions.error";






export class SessionRepositoryPrisma implements SessionGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new SessionRepositoryPrisma(repository);
    };
    
    public async session(token: string): Promise<User> {
        const userDecoded = decode(token) as User;

        const user = await this.repository.user.findUnique({
            where: { id: userDecoded.id }
        });

        if(!user) {
            throw new UserExceptions("user not found with id");
        };

        return User.with(user);
    };

}