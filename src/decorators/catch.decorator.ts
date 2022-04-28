import { Response } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts } from "../models/http.model";
import { MyLogger } from '../utils/logger';

export interface CathConfig {
    context?: string;
    withResponse?: boolean;
    message?: string;
}

export const Trycatch = (config?: CathConfig) => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const fn = descriptor.value;
    const logger: MyLogger = new MyLogger();
    descriptor.value = async function (...args){
        const response: Response = (args[0]?.response ? args[0]?.response : args[1]) as Response;
        try {
            return await fn.apply(this, args);
        } catch (error) {
            if(!config?.withResponse){
                throw new Error(error?.message);
            };
            
            logger.error(error);

            response
                .status(HttpStauts.INTERNAL_ERR)
                .json(new HttpResponse({
                    message: config?.message || error?.message,
                    status: HttpStauts.INTERNAL_ERR,
                    service: 'restapi',
                    context: config?.context || propertyKey,
                    date: new Date()
                }));
        }
    };

    return descriptor;
};