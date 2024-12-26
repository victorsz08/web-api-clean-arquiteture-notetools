import { Contract, Status } from "../../domain/entities/contract/contract.entity";
import { ContractGateway } from "../../domain/gateway/contract/contract.gateway";
import { Usecase } from "../usecase";



export type UpdateContractInputDto = {
    id: string;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    observation: string;
    status: Status;
    contact: string;
    price: number;
};

export type UpdateContractOutputDto = {
    id: string;
};

export class UpdateContractUsecase implements Usecase<UpdateContractInputDto, UpdateContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new UpdateContractUsecase(contractGateway);
    };
    
    public async execute({ 
        id, 
        local, 
        scheduleDate, 
        scheduleTime, 
        observation, 
        status, 
        contact, 
        price 
    } : UpdateContractInputDto): Promise<UpdateContractOutputDto> {
        const aContract = await this.contractGateway.find(id); 
        
        await this.contractGateway.update(id, local, scheduleDate, scheduleTime, observation, price, status, contact);

        const output = this.presentOutput(aContract);

        return output;
    };

    private presentOutput(contract: Contract): UpdateContractOutputDto {
        const output: UpdateContractOutputDto = {
            id: contract.id
        };

        return output;
    };
    
}