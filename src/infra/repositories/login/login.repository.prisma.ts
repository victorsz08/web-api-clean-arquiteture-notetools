import { PrismaClient } from "@prisma/client";
import { LoginGateway } from "../../../domain/gateway/login/login.gateway";
import { UserExceptions } from "../../../package/exceptions/user.exceptions.error";
import { compare } from "bcryptjs";
import { JwtPayload, sign } from "jsonwebtoken";
import { jwtSecret } from "../../../../prisma/config/config";



export class LoginRespository implements LoginGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new LoginRespository(repository);
    };
    
    public async auth(username: string, password: string): Promise<string> {
        const user = await this.repository.user.findUnique({
            where: {
                username
            }
        });

        if(!user) {
            throw new UserExceptions("password or username do not match");
        };

        const validatePassword = await compare(password, user.password);

        if(!validatePassword) {
            throw new UserExceptions("password or username do not match");
        };

        const payload = sign({
            id: user.id
        }, jwtSecret.secret, { expiresIn: '1d' });
        
        return payload;
    }

}