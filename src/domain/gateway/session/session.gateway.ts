import { User } from "../../entities/user/user.entity";



export interface SessionGateway {
    session(token: string): Promise<User>;
};