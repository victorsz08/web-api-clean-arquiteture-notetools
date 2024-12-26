import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteContractInputDto, DeleteContractUsecase } from "../../../../../usecase/contract/delete.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";






export class DeleteContractRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteContractService: DeleteContractUsecase
    ) {};

    public static build(deleteContractService: DeleteContractUsecase) {
        return new DeleteContractRoute("/contracts/:id", HttpMethod.DELETE, deleteContractService);
    };
    
    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            try {
                const input: DeleteContractInputDto = {
                    id
                };

                await this.deleteContractService.execute(input);

                return response.status(200).json({ message: "OK" }).send();
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
}