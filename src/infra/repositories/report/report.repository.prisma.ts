import { PrismaClient } from "@prisma/client";
import { Report } from "../../../domain/entities/report/report.entity";
import { ReportGateway } from "../../../domain/gateway/report/report.gateway";
import { NotFoundException } from "../../../package/exceptions/error.request.exception";
import { Status, TypeContract } from "../../../domain/entities/contract/contract.entity";




export class ReportRepositoryPrisma implements ReportGateway {
    
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new ReportRepositoryPrisma(repository);
    };
    
    public async findReports(userId: string, startDate: string, endDate: string): Promise<Report> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});

        if(!user) {
            throw new NotFoundException("user not found with id");
        };

        const contracts = await this.repository.contract.findMany({
            where: {
                user: {
                    id: user.id
                },
                scheduleDate: {
                    gte: new Date(startDate).toISOString(),
                    lte: new Date(endDate).toISOString()
                }
            }
        });

        if(!contracts) {
            throw new NotFoundException("contracts not found with user or params");
        };

        const total = contracts.length;
        const totalBase = contracts.filter((c) => c.type === TypeContract.BASE);
        const totalProspect = contracts.filter((c) => c.type === TypeContract.PROSPECT);
        const totalDropout = contracts.filter((c) => c.status === Status.CANCELADO);
        const totalInstalled = contracts.filter((c) => c.status === Status.CONECTADO);
        const billing = totalInstalled.reduce((total, c) => total + c.price, 0);
        const dropoutPercentage = (totalDropout.length / total) * 100;
        const installedPercentage = (totalInstalled.length / total) * 100;

        const reports = Report.with({
            dropoutPercentage: dropoutPercentage,
            installedPercentage: installedPercentage,
            dropout: totalDropout.length,
            installed: totalInstalled.length,
            billing: parseFloat(billing.toFixed(2)),
            total: total,
            totalBase: totalBase.length,
            totalProspect: totalProspect.length
        });

        return reports;
    };

}