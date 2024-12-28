import { NextFunction, Request, Response } from "express";
import { Status, TypeContract } from "../../../../../domain/entities/contract/contract.entity";
import { HttpMethod, Route } from "../route";
import { FindContractInputDto, FindContractOutputDto, FindContractUsecase } from "../../../../../usecase/contract/find.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export type FindContractResponseDto = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    observation: string;
    price: number;
    status: Status;
    contact: string;
    type: TypeContract;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class FindContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findContractService: FindContractUsecase
    ) {};
    
    public static build(findContractService: FindContractUsecase) {
        return new FindContractRoute("/contracts/:id", HttpMethod.GET, findContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: FindContractInputDto = {
                    id
                };

                const data = await this.findContractService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode}).send();
                };

                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            };
        };
    };

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
        return new AuthMiddleware().execute();
    }

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(contract: FindContractOutputDto): FindContractResponseDto {
        const output: FindContractResponseDto = {
            id: contract.id,
            number: contract.number,
            local: contract.local,
            scheduleDate: contract.scheduleDate,
            scheduleTime: contract.scheduleTime,
            observation: contract.observation,
            status: contract.status,
            price: contract.price,
            contact: contract.contact,
            type: contract.type,
            userId: contract.userId,
            createdAt: contract.createdAt,
            updatedAt: contract.updatedAt
        };

        return output;
    };
};
