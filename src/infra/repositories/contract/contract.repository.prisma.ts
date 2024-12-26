import { Prisma, PrismaClient } from "@prisma/client";
import { Contract, Status, TypeContract } from "../../../domain/entities/contract/contract.entity";
import { ContractGateway } from "../../../domain/gateway/contract/contract.gateway";
import { NotFoundException } from "../../../package/exceptions/error.request.exception";
import { DefaultArgs } from "@prisma/client/runtime/library";



export class ContractRespositoryPrisma implements ContractGateway {
    
    private constructor(private readonly respository: PrismaClient) {};

    public static build(respository: PrismaClient) {
        return new ContractRespositoryPrisma(respository);
    };
    
    public async save({ id, number, local, scheduleDate, scheduleTime, observation, price, userId, contact, createdAt, updatedAt, status, type }: Contract): Promise<void> {
        const user = await this.respository.user.findUnique({ where: { id: userId }});

        if(!user) {
            throw new NotFoundException("user not found with id");
        };

        const contract = await this.respository.contract.create({
            data: {
                id,
                number,
                local,
                scheduleDate,
                scheduleTime,
                observation,
                price,
                type,
                status,
                contact,
                user: {
                    connect: { id: userId }
                },
                createdAt,
                updatedAt
            }
        });

        return;
    };

    public async list(status: Status, scheduleStartDate: string, scheduleEndDate: string, createdStartDate: string, createdEndDate: string, userId: string): Promise<Contract[]> {
        const queryOptions: Prisma.ContractFindManyArgs<DefaultArgs> = {
            where: {
                userId: userId,
                ...(status && {
                    status: status
                }),
                ...((scheduleStartDate && scheduleEndDate) && {
                    scheduleDate: {
                        gte: new Date(scheduleStartDate).toISOString(),
                        lte: new Date(scheduleEndDate).toISOString(),
                    }
                }),
                ...((createdStartDate && createdEndDate) && {
                    createdAt: {
                        gte: new Date(createdStartDate).toISOString(),
                        lte: new Date(createdEndDate).toISOString(),
                    }
                })
            }
        };

        const contracts = await this.respository.contract.findMany(queryOptions);

        if(contracts.length === 0) {
            throw new NotFoundException("contracts not found");
        };

        const contractsList = contracts.map((c) => {
            return Contract.with({
                id: c.id,
                number: c.number,
                local: c.local,
                scheduleDate: c.scheduleDate,
                scheduleTime: c.scheduleTime,
                observation: c.observation,
                price: c.price,
                type: c.type as TypeContract,
                status: c.status as Status,
                contact: c.contact,
                userId: c.userId,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt
            })
        });

        return contractsList;
    };


    public async find(id: string): Promise<Contract> {
        const contract = await this.respository.contract.findUnique({ where: { id }});

        if(!contract) {
            throw new NotFoundException("contract not found with id");
        };

        return Contract.with({
            id: contract.id,
            number: contract.number,
            local: contract.local,
            scheduleDate: contract.scheduleDate,
            scheduleTime: contract.scheduleTime,
            observation: contract.observation,
            price: contract.price,
            type: contract.type as TypeContract,
            status: contract.status as Status,
            contact: contract.contact,
            userId: contract.userId,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt
        });
    };

    public async update(id: string, local: string, scheduleDate: Date, scheduleTime: string, observation: string, price: number, status: Status, contact: string): Promise<void> {
        const contract = await this.find(id);

        await this.respository.contract.update({
            where: {
                id: contract.id
            },
            data: {
                local,
                scheduleDate,
                scheduleTime,
                observation,
                price,
                contact,
                status
            }
        });

        return;
    };


    public async delete(id: string): Promise<void> {
        const contract = await this.find(id);

        await this.respository.contract.delete({ where: { id: contract.id }});

        return;
    };
};