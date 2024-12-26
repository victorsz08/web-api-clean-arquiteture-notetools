import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateContractInputDto, CreateContractOutputDto, CreateContractUsecase } from "../../../../../usecase/contract/create.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";



export type CreateContractResponseDto = {
    id: string;
};



export class CreateContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createContractService: CreateContractUsecase
    ) {};
    
    public static build(createContractService: CreateContractUsecase) {
        return new CreateContractRoute("/contracts/:userId", HttpMethod.POST, createContractService);
    };

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;
            const { number, local, scheduleDate, observation, scheduleTime, contact, type, price } = request.body;

            try {
                const input: CreateContractInputDto = {
                    number, 
                    local,
                    scheduleDate,
                    scheduleTime,
                    contact,
                    observation,
                    type,
                    price,
                    userId
                };

                const data = await this.createContractService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(201).json(responseBody).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode }).send();
                };

                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            };
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(data: CreateContractOutputDto): CreateContractResponseDto {
        const output: CreateContractResponseDto = {
            id: data.id
        };

        return output;
    };

}