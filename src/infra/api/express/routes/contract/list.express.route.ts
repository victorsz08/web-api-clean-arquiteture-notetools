import { NextFunction, Request, Response } from "express";
import { Status, TypeContract } from "../../../../../domain/entities/contract/contract.entity";
import { HttpMethod, Route } from "../route";
import { ListContractInputDto, ListContractOutputDto, ListContractUsecase } from "../../../../../usecase/contract/list.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";



export type ListContractResponseDto = {
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

export class ListContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listContractService: ListContractUsecase
    ) {};
    
    public static build(listContractService: ListContractUsecase) {
        return new ListContractRoute("/contracts", HttpMethod.GET, listContractService);
    };

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
        return new AuthMiddleware().execute();
    }

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { status, scheduleStartDate, scheduleEndDate, createdStartDate, createdEndDate, userId } = request.query;

            try {
                const input: ListContractInputDto = {
                    status: status as Status,
                    scheduleStartDate: scheduleStartDate!.toString(),
                    scheduleEndDate: scheduleEndDate!.toString(),
                    createdStartDate: createdStartDate!.toString(),
                    createdEndDate: createdEndDate!.toString(),
                    userId: userId!.toString()
                };

                const data = await this.listContractService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
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

    private presentResponse(data: ListContractOutputDto): ListContractResponseDto {
        const output: ListContractResponseDto = {
            contracts: data.contracts.map((c) => {
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
        };

        return output;
    };
};