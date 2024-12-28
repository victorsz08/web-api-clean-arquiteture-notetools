import { NextFunction, Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindReportInputDto, FindReportOutputDto, FindReportUsecase } from "../../../../../usecase/report/find.usecase";
import { NotFoundException } from "../../../../../package/exceptions/error.request.exception";
import { Middleware } from "../../../../../middleware/middleware";
import { AuthMiddleware } from "../../../../../middleware/auth.middlware";




export type FindReportresponseDto = {
    dropoutPercentage: number;
    installedPercentage: number;
    dropout: number;
    installed: number;
    totalBase: number;
    totalProspect: number; 
    billing: number;
    total: number;
};

export class FindReportRoute implements Route {
    
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findReportService: FindReportUsecase
    ) {};
    
    public static build(findReportService: FindReportUsecase) {
        return new FindReportRoute("/reports/:userId", HttpMethod.GET, findReportService);
    };
    

    public getHandler(): (request: Request, response: Response) => Promise<any> {
        return async (request: Request, response: Response) => {
            const { userId } = request.params;
            const { startDate, endDate } = request.body;

            try {
                const input: FindReportInputDto = {
                    userId,
                    startDate,
                    endDate
                };

                const data = await this.findReportService.execute(input);

                const responseBody = this.presentResponse(data);

                return response.status(200).json(responseBody).send();
            } catch (error) {
                if(error instanceof NotFoundException) {
                    return response.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode }).send();
                };
                
                return response.status(500).json({ error: "server internal error", statusCode: 500 }).send();
            }
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

    private presentResponse({
        dropoutPercentage,
        installedPercentage,
        dropout,
        installed,
        totalBase,
        totalProspect,
        total,
        billing
    } : FindReportOutputDto): FindReportresponseDto {
        return {
            dropoutPercentage,
            installedPercentage,
            dropout,
            installed,
            totalBase,
            totalProspect,
            total,
            billing
        };
    };

};