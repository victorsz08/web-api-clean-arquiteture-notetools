import { Request, Response, NextFunction } from "express";


export interface Middleware {
    execute(): (request: Request, response: Response, next: NextFunction) => Promise<void>; 
};