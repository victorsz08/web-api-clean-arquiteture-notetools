import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/user/user.entity";
import { UserGateway } from "../../../domain/gateway/user/user.gateway";
import { UserExceptions } from "../../../package/exceptions/user.exceptions.error";
import { compare, hash } from "bcryptjs";





export class UserRepositoryPrisma implements UserGateway {
    
    private constructor(private readonly repository: PrismaClient) {};
    
    public static build(repository: PrismaClient) {
        return new UserRepositoryPrisma(repository);
    };
    
    public async save({ id, username, firstName, lastName, isAdmin, password, createdAt, updatedAt } : User): Promise<void> {
        const usernameAlreadyExists = await this.repository.user.findUnique({
            where: {
                username
            }
        });

        if(usernameAlreadyExists) {
            throw new UserExceptions("username already exists");
        };

        const passwordHashed = await hash(password, 10);

        const data = {
            id,
            username,
            firstName,
            lastName,
            isAdmin,
            password: passwordHashed,
            createdAt,
            updatedAt
        };

        await this.repository.user.create({
            data
        });


        return;
    };


    public async list(search?: string): Promise<User[]> {
        const users = await this.repository.user.findMany({
            where: {
                ...(search && {
                    AND: [
                        { username: { contains: search }},
                        { firstName: { contains: search }},
                        { lastName: { contains: search }}
                    ]
                })
            }
        });

        if(users.length <= 0) {
            throw new UserExceptions("users not found");
        };

        const usersList = users.map((u) => {
            return User.with(u)
        });

        return usersList;
    };


    public async find(id: string): Promise<User> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new UserExceptions("user not found with id");
        };

        return User.with(user);
    };


    public async update(id: string, username: string, firstName: string, lastName: string): Promise<void> {
        const user = await this.find(id);

        if(user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique({ where: { username }});

            if(usernameAlreadyExists) {
                throw new UserExceptions("username already exists");
            };
        };

        await this.repository.user.update({
            where: {
                id
            },
            data: {
                username,
                firstName,
                lastName
            }
        });

        return
    };


    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.user.delete({ where: { id }});

        return;
    };

    public async alterPassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await this.find(id);

        const validatePassword = await compare(currentPassword, user.password);

        if(!validatePassword) {
            throw new UserExceptions("current password does not match");
        };

        const newPasswordHashed = await hash(newPassword, 10);

        await this.repository.user.update({
            where: {
                id
            },
            data: {
                password: newPasswordHashed
            }
        });

        return;
    };

    public async resetPassword(id: string): Promise<string> {
        await this.find(id);

        const passwordRandom = Math.random().toString(30).slice(-10);

        const passwordHashed = await hash(passwordRandom, 10);

        await this.repository.user.update({
            where: {
                id
            },
            data: {
                password: passwordHashed 
            }
        });

        return passwordRandom;
    };
};