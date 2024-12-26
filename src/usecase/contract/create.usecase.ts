import { Contract, TypeContract } from "../../domain/entities/contract/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract/contract.gateway";
import { Usecase } from "../usecase";



export type CreateContractInputDto = {
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    observation: string;
    type: TypeContract;
    price: number;
    contact: string;
    userId: string; 
};

export type CreateContractOutputDto = {
    id: string;
};


export class CreateContractUsecase implements Usecase<CreateContractInputDto, CreateContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new CreateContractUsecase(contractGateway);
    };
    
    public async execute({ 
        number, 
        local, 
        scheduleDate, 
        scheduleTime, 
        observation,
        contact,
        price,
        type,
        userId
    } : CreateContractInputDto): Promise<CreateContractOutputDto> {
        const aContract = Contract.build(number, local, scheduleDate, scheduleTime, observation, price, type, contact, userId);

        await this.contractGateway.save(aContract);

        const output = this.presentOutput(aContract);

        return output;

    };

    private presentOutput(contract: Contract): CreateContractOutputDto {
        const output: CreateContractOutputDto = {
            id: contract.id
        };

        return output;
    };

}