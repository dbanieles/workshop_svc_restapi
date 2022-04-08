import { HttpStauts } from "./http.model";

export class HttpResponse<T> {
    status: HttpStauts;
    message: string;
    service?: string;
    context: string;
    date: Date;
    data?: T | T[];

    constructor(params: HttpResponse<T>){
        this.status = params.status;
        this.message = params.message;
        this.context = params.context;
        this.date = params.date || new Date();
        this.data = params.data;
    }
}