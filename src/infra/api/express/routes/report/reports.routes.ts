import { prisma } from "../../../../../package/prisma/prisma";
import { FindReportUsecase } from "../../../../../usecase/report/find.usecase";
import { ReportRepositoryPrisma } from "../../../../repositories/report/report.repository.prisma";
import { FindReportRoute } from "./find.express.route";




const reportRepository = ReportRepositoryPrisma.build(prisma);

const findUsecase = FindReportUsecase.build(reportRepository);

const findRoute = FindReportRoute.build(findUsecase);

export const reportRoutes = [findRoute];