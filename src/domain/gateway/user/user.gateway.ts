import { User } from "../../entities/user/user.entity";


export interface UserGateway {
    save(user: User): Promise<void>;
    list(search?: string): Promise<User[]>;
    find(id: string): Promise<User>;
    update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
    delete(id: string): Promise<void>;
    alterPassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
    resetPassword(id: string): Promise<string>;
};