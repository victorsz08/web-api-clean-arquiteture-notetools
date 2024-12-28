import { prisma } from "../../../../../package/prisma/prisma";
import { CreateNoteUsecase } from "../../../../../usecase/note/create.usecase";
import { DeleteNoteUsecase } from "../../../../../usecase/note/delete.usecase";
import { FindNoteUsecase } from "../../../../../usecase/note/find.usecase";
import { ListNoteUsecase } from "../../../../../usecase/note/list.usecase";
import { UpdateNoteUsecase } from "../../../../../usecase/note/update.usecase";
import { NoteRepositoryPrisma } from "../../../../repositories/note/note.repository.prisma";
import { CreateNoteRoute } from "./create.express.route";
import { DeleteNoteRoute } from "./delete.express.route";
import { FindNoteRoute } from "./find.express.route";
import { ListNoteRoute } from "./list.express.route";
import { UpdateNoteRoute } from "./update.express.route";



const noteRespository = NoteRepositoryPrisma.build(prisma);

const createUsecase = CreateNoteUsecase.build(noteRespository);
const listUsecase = ListNoteUsecase.build(noteRespository);
const findUsecase = FindNoteUsecase.build(noteRespository);
const updateUsecase = UpdateNoteUsecase.build(noteRespository);
const deleteUsecase = DeleteNoteUsecase.build(noteRespository);

const createRoute = CreateNoteRoute.build(createUsecase);
const listRoute = ListNoteRoute.build(listUsecase);
const findRoute = FindNoteRoute.build(findUsecase);
const updateRoute = UpdateNoteRoute.build(updateUsecase);
const deleteRoute = DeleteNoteRoute.build(deleteUsecase);


export const noteRoutes = [
    createRoute,
    listRoute,
    findRoute,
    updateRoute,
    deleteRoute
];
