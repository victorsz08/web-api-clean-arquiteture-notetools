import { ContractGateway } from "../../domain/gateway/contract/contract.gateway";
import { Usecase } from "../usecase";



export type DeleteContractInputDto = {
    id: string;
};

export type DeleteContractOutputDto = void;


export class DeleteContractUsecase implements Usecase<DeleteContractInputDto, DeleteContractOutputDto> {
    
    private constructor(private readonly contractGateway: ContractGateway) {};

    public static build(contractGateway: ContractGateway) {
        return new DeleteContractUsecase(contractGateway);
    };
    
    public async execute({ id } : DeleteContractInputDto): Promise<void> {
        await this.contractGateway.delete(id);

        return;
    };
};