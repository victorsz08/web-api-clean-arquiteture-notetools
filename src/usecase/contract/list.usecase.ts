import { Contract, Status, TypeContract } from "../../domain/entities/contract/contract.entity"
import { ContractGateway } from "../../domain/gateway/contract/contract.gateway";
import { Usecase } from "../usecase";



export type ListContractInputDto = {
    status: Status,
    scheduleStartDate: string | null,
    scheduleEndDate: string | null,
    createdStartDate: string | null,
    createdEndDate: string | null,
    userId: string
};

export type ListContractOutputDto = {
    contracts: {
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
    }[];
};


export class ListContractUsecase implements Usecase<ListContractInputDto, ListContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new ListContractUsecase(contractGateway);
    };
    
    public async execute({ status, scheduleStartDate, scheduleEndDate, createdStartDate, createdEndDate, userId } : ListContractInputDto): Promise<ListContractOutputDto> {
        const aContracts = await this.contractGateway.list(status, scheduleStartDate, scheduleEndDate, createdStartDate, createdEndDate, userId);

        const output = this.presentOutput(aContracts);


        return output;
    };

    private presentOutput(contracts: Contract[]): ListContractOutputDto {
        const output: ListContractOutputDto = {
            contracts: contracts.map((c) => {
                return {
                    id: c.id,
                    number: c.number,
                    local: c.local,
                    scheduleDate: c.scheduleDate,
                    scheduleTime: c.scheduleTime,
                    observation: c.observation,
                    status: c.status,
                    price: c.price,
                    contact: c.contact,
                    type: c.type,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt
                }
            })
        }

        return output;
    }

}