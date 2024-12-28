import { Report } from "../../domain/entities/report/report.entity";
import { ReportGateway } from "../../domain/gateway/report/report.gateway";
import { Usecase } from "../usecase";




export type FindReportInputDto = {
    userId: string;
    startDate: string;
    endDate: string;
};

export type FindReportOutputDto = {
    dropoutPercentage: number;
    installedPercentage: number;
    dropout: number;
    installed: number;
    totalBase: number;
    totalProspect: number; 
    billing: number;
    total: number;
};

export class FindReportUsecase implements Usecase<FindReportInputDto, FindReportOutputDto> {
    
    private constructor(private readonly reportGateway: ReportGateway) {};

    public static build(reportGateway: ReportGateway) {
        return new FindReportUsecase(reportGateway);
    };
    
    public async execute({ userId, startDate, endDate } : FindReportInputDto): Promise<FindReportOutputDto> {
        const aReport = await this.reportGateway.findReports(userId, startDate, endDate);

        const output = this.presentOutput(aReport);

        return output;
    };

    private presentOutput({ 
        billing, 
        dropout, 
        dropoutPercentage, 
        installed, 
        installedPercentage, 
        total, 
        totalBase, 
        totalProspect
    } : Report): FindReportOutputDto {
        return {
            dropoutPercentage, 
            installedPercentage,
            dropout,
            installed,
            billing,
            totalBase,
            totalProspect,
            total
        };
    };
};