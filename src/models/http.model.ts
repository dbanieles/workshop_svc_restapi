import { Request, Response, NextFunction } from 'express';

export interface HttpParams {
    request: Request;
    response: Response;
    next: NextFunction;
}

export enum HttpStauts {
    BAD_ARGS = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERR = 500,
    SUCCESS = 200
}

export enum HttpStautsMessage {
    OK = "OK",
    KO = "KO",
}