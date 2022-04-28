import { Controller, Get, Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts, HttpStautsMessage} from "../models/http.model";
import { SERVICE_NAME } from '../utils/costants';
import { MyLogger } from '../utils/logger';
import { Inject } from '../decorators/inject.decorator';

@Controller('/')
export class HealthcheckController {

    @Inject(MyLogger)
    private _logger: MyLogger;

    constructor() {}

    @Get('/health')
    healthcheck(request: Request, response: Response, next: NextFunction) {
        this._logger.info(HttpStautsMessage.OK);
        
        return response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "healthcheck",
            service: SERVICE_NAME,
            date: new Date(),
        }));
    }

}