import { Response } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts } from "../models/http.model";

export interface CathConfig {
    context?: string;
    useResponse?: boolean;
    message?: string;
}

export const Trycatch = (config?: CathConfig) => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const fn = descriptor.value;
    
    descriptor.value = async function (...args){
        const response: Response = (args[0]?.response ? args[0]?.response : args[1]) as Response;
        try {
            return await fn.apply(this, args);
        } catch (error) {
            if(!config?.useResponse){
                throw new Error(error?.message)
            };
            
            console.error(error);

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