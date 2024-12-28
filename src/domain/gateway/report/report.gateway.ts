import { Report } from "../../entities/report/report.entity";


export interface ReportGateway {
    findReports(userId: string, startDate: string, endDate: string): Promise<Report>;
};