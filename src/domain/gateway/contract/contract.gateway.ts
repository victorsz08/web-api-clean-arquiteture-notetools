import { Contract, Status, TypeContract } from "../../entities/contract/contract.entity";


export interface ContractGateway {
    save(contract: Contract): Promise<void>;
    list(
        status: Status,
        scheduleStartDate: string | null,
        scheduleEndDate: string | null,
        createdStartDate: string | null,
        createdEndDate: string | null,
        userId: string
    ): Promise<Contract[]>;
    find(id: string): Promise<Contract>;
    update(
        id: string,
        local: string, 
        scheduleDate: Date, 
        scheduleTime: string,
        observation: string,
        price: number,
        status: Status,
        contact: string,
    ): Promise<void>;
    delete(id: string): Promise<void>;
}