import { Injectable } from "@decorators/di";
import { Logger } from "winston";

const winston = require('winston');

@Injectable()
export class MyLogger {

    private _logger: Logger;

    constructor(){
       this._logger = this.config();
    }

    config(): Logger{
        return winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new (winston.transports.File)({ 
                    filename: '/var/lib/restapi/data/restapi.log',
                    level: 'info' 
                })
            ],
            format: winston.format.combine(
                winston.format.label({
                    label: `Workshop`
                }),
                winston.format.timestamp({
                   format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
            )
        });
    }

    info = (msg: string) => this._logger.info(msg);

    debug = (msg: string) => this._logger.debug(msg);

    error = (msg: string) => this._logger.error(msg);

    warn = (msg: string) => this._logger.warn(msg);

}