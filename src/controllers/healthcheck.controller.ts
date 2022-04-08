import { Controller, Get, Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts, HttpStautsMessage} from "../models/http.model";
import { SERVICE_NAME } from '../utils/costants';

@Controller('/')
export class HealthcheckController {

    constructor() {}

    @Get('/health')
    healthcheck(request: Request, response: Response, next: NextFunction) {
        return response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "healthcheck",
            service: SERVICE_NAME,
            date: new Date(),
        }));
    }

}