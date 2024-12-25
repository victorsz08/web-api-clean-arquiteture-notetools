import { prisma } from "../../../../../package/prisma/prisma";
import { AlterPasswordUsecase } from "../../../../../usecase/user/alter-password.usecase";
import { CreateUserUsecase } from "../../../../../usecase/user/create.usecase";
import { DeleteUserUsecase } from "../../../../../usecase/user/delete.usecase";
import { FindUserUsecase } from "../../../../../usecase/user/find.usecase";
import { ListUserUsecase } from "../../../../../usecase/user/list.usecase";
import { ResetPasswordUsecase } from "../../../../../usecase/user/reset-password.usecase";
import { UpdateUserUsecase } from "../../../../../usecase/user/update.usecase";
import { UserRepositoryPrisma } from "../../../../repositories/user/user.repository.prisma";
import { AlterPasswordRoute } from "./alter-password.express";
import { CreateUserRoute } from "./create.express.route";
import { DeleteUserRoute } from "./delete.express.route";
import { FindUserRoute } from "./find.express.route";
import { ListUserRoute } from "./list.express.route";
import { ResetPasswordRoute } from "./reset-password.express.route";
import { UpdateUserRoute } from "./update.express.route";




const userRepository = UserRepositoryPrisma.build(prisma);


const createUserUsecase = CreateUserUsecase.build(userRepository);
const findUserUsecase = FindUserUsecase.build(userRepository);
const listUserUsecase = ListUserUsecase.build(userRepository);
const updateUserUsecase = UpdateUserUsecase.build(userRepository);
const deleteUserUsecase = DeleteUserUsecase.build(userRepository);
const alterPasswordUsecase = AlterPasswordUsecase.build(userRepository);
const resetPasswordUsecase = ResetPasswordUsecase.build(userRepository);


const createRoute = CreateUserRoute.build(createUserUsecase);
const findRoute = FindUserRoute.build(findUserUsecase);
const listRoute = ListUserRoute.build(listUserUsecase);
const updateRoute = UpdateUserRoute.build(updateUserUsecase);
const deleteRoute = DeleteUserRoute.build(deleteUserUsecase);
const alterPassword = AlterPasswordRoute.build(alterPasswordUsecase);
const resetPassword = ResetPasswordRoute.build(resetPasswordUsecase);


export const userRoutes = [
    createRoute,
    findRoute,
    listRoute,
    updateRoute,
    deleteRoute,
    alterPassword,
    resetPassword
];