import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateContractInputDto, UpdateContractOutputDto, UpdateContractUsecase } from "../../../../../usecase/contract/update.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export type UpdateContractResponseDto = {
    id: string;
};



export class UpdateContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateContractService: UpdateContractUsecase
    ) {};
    
    public static build(updateContractService: UpdateContractUsecase) {
        return new UpdateContractRoute("/contracts/:id", HttpMethod.PUT, updateContractService);
    };

    public getMiddlewares(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
        return new AuthMiddleware().execute();
    }
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            const { local, scheduleDate, scheduleTime, price, observation, status, contact } = request.body;

            try {
                const input: UpdateContractInputDto = {
                    local, 
                    scheduleDate,
                    scheduleTime,
                    price,
                    observation,
                    status,
                    contact,
                    id
                };

                const data = await this.updateContractService.execute(input);

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

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    private presentResponse(data: UpdateContractOutputDto): UpdateContractResponseDto {
        const output: UpdateContractResponseDto = {
            id: data.id
        };
        
        return output;
    };
};