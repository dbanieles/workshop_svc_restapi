import { User } from "../models/user.model";
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts } from "../models/http.model";


export interface ParamConfig {
    includes?: string[];
    exclude?: string[];
    required?: boolean;
}

export const Args = (config?: ParamConfig) => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
        const request: Request = args[0] as Request;
        const response: Response = args[1] as Response;
        const params: any = { 
            ...request.params,
            ...request.body
        };

        const isValid:boolean[] = Object.keys({...params})
            .filter((key:string)=> !config?.exclude?.includes(key))
            .map((key:string)=> !!params[key])
            .filter((param: boolean)=> !param);

        if(isValid.length > 0 && config?.required){
            response
                .status(HttpStauts.BAD_ARGS)
                .json(new HttpResponse({
                    status: HttpStauts.BAD_ARGS, 
                    message: "Invalid Argument Exception",
                    context: propertyKey,
                    service: 'restapi',
                    date: new Date()
                }));
        }
      
        return originalMethod.apply(this, args);
    };

    return descriptor;
};