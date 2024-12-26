import { ApiExpress } from "./infra/api/express/api.express";
import { authRoutes } from "./infra/api/express/routes/auth/auth.routes";
import { contractRoutes } from "./infra/api/express/routes/contract/contract.routes";
import { userRoutes } from "./infra/api/express/routes/user/user.routes";


export function server() {
    const api = ApiExpress.build([
        ...userRoutes, 
        ...authRoutes,
        ...contractRoutes,
    ]);
    api.start(8000);
};

server();