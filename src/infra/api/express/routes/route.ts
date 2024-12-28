import { NextFunction, Request, Response } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod
} as const;

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<any>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares?(): (request: Request, response: Response, next: NextFunction) => Promise<any>; 
};