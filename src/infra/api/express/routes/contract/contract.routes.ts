import { prisma } from "../../../../../package/prisma/prisma";
import { CreateContractUsecase } from "../../../../../usecase/contract/create.usecase";
import { DeleteContractUsecase } from "../../../../../usecase/contract/delete.usecase";
import { FindContractUsecase } from "../../../../../usecase/contract/find.usecase";
import { ListContractUsecase } from "../../../../../usecase/contract/list.usecase";
import { UpdateContractUsecase } from "../../../../../usecase/contract/update.usecase";
import { ContractRespositoryPrisma } from "../../../../repositories/contract/contract.repository.prisma";
import { CreateContractRoute } from "./create.express.route";
import { DeleteContractRoute } from "./delete.express.route";
import { FindContractRoute } from "./find.express.route";
import { ListContractRoute } from "./list.express.route";
import { UpdateContractRoute } from "./update.express.route";





const contractRepository = ContractRespositoryPrisma.build(prisma);

const createUsecase = CreateContractUsecase.build(contractRepository);
const listUsecase = ListContractUsecase.build(contractRepository);
const findUsecase = FindContractUsecase.build(contractRepository);
const updateUsecase = UpdateContractUsecase.build(contractRepository);
const deleteUsecase = DeleteContractUsecase.build(contractRepository);

const createRoute = CreateContractRoute.build(createUsecase);
const listRoute = ListContractRoute.build(listUsecase);
const findRoute = FindContractRoute.build(findUsecase);
const updateRoute = UpdateContractRoute.build(updateUsecase);
const deleteRoute = DeleteContractRoute.build(deleteUsecase);


export const contractRoutes = [
    createRoute,
    listRoute,
    findRoute,
    updateRoute,
    deleteRoute
];