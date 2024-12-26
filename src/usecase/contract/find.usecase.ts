import { Contract, Status, TypeContract } from "../../domain/entities/contract/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract/contract.gateway";
import { Usecase } from "../usecase";



export type FindContractInputDto = {
    id: string;
};

export type FindContractOutputDto = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    observation: string;
    price: number;
    contact: string;
    type: TypeContract;
    status: Status;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindContractUsecase implements Usecase<FindContractInputDto, FindContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new FindContractUsecase(contractGateway);
    };
    
    public async execute({ id } : FindContractInputDto): Promise<FindContractOutputDto> {
        const aContract = await this.contractGateway.find(id);

        const output = this.presentOutput(aContract);

        return output;
    };

    private presentOutput(contract: Contract): FindContractOutputDto {
        const output: FindContractOutputDto = {
            id: contract.id,
            number: contract.number,
            local: contract.local,
            scheduleDate: contract.scheduleDate,
            scheduleTime: contract.scheduleTime,
            observation: contract.observation,
            type: contract.type,
            price: contract.price,
            contact: contract.contact,
            status: contract.status,
            userId: contract.userId,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt
        };

        return output;
    }

} 