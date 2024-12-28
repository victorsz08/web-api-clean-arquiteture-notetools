import { Request, Response, NextFunction } from "express";
import { Middleware } from "./middleware";
import { decode, verify } from "jsonwebtoken";
import { jwtSecret } from "../../prisma/config/config";





export class AuthMiddleware implements Middleware {
    public execute(): (request: Request, response: Response, next: NextFunction) => Promise<any> {
        return async (request: Request, response: Response, next: NextFunction) => {
            const token = request.headers.authorization;

            if(!token) {
                return response.status(401).json({ error: "token not found", statusCode: 401 }).send();
            };

            const [_bearer, accessToken] = token.split(" ");

            try {
                verify(accessToken, jwtSecret.secret);

                return next();
            } catch (error) {
                return response.status(401).json({ error: "user unauthorized", statusCode: 401 }).send();
            };
        };
    };
};