import { prisma } from "../../../../../package/prisma/prisma";
import { LoginUsecase } from "../../../../../usecase/login/login.usecase";
import { SessionUsecase } from "../../../../../usecase/session/session.usecase";
import { LoginRespository } from "../../../../repositories/login/login.repository.prisma";
import { SessionRepositoryPrisma } from "../../../../repositories/session/session.repository.prisma";
import { LoginAuthRoute } from "./auth.login.express.route";
import { SessionRoute } from "./session.express.route";



const sessionRepository = SessionRepositoryPrisma.build(prisma);
const loginRespository = LoginRespository.build(prisma);

const sessionUsecase = SessionUsecase.build(sessionRepository);
const loginUsecase = LoginUsecase.build(loginRespository);

const sessionRoute = SessionRoute.build(sessionUsecase);
const loginRoute = LoginAuthRoute.build(loginUsecase);

export const authRoutes = [sessionRoute, loginRoute];