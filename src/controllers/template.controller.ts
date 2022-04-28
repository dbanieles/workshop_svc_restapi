import { Controller, Delete, Get, Post, Put } from "@decorators/express";
import { Request, Response, NextFunction } from 'express';
import { API_BASE_URL, SERVICE_NAME } from "../utils/costants";
import { Args } from "../decorators/args.decorator";
import { Trycatch } from "../decorators/catch.decorator";
import { Inject } from "../decorators/inject.decorator";
import { HttpStauts, HttpStautsMessage } from "../models/http.model";
import { HttpResponse } from "../models/response.model";
import { Template } from "../models/template.model";
import { TemplateService } from "../services/template.service";


@Controller(API_BASE_URL)
export class TemplateController {

    @Inject(TemplateService)
    private _templateService: TemplateService;

    constructor(){ }

    @Get('/templates')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getTemplates(request: Request, response: Response, next: NextFunction){
        const templates: Template[] = await this._templateService.getTemplates({request, response, next});
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getTemplates",
            service: SERVICE_NAME,
            date: new Date(),
            data: templates
        }));
    }

    @Get('/templates/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getTemplate(request: Request, response: Response, next: NextFunction){
        const templateId: number = Number(request.params['id']);
        const template: Template = await this._templateService.getTemplateById({request, response, next}, templateId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getTemplate",
            service: SERVICE_NAME,
            date: new Date(),
            data: template
        }));
    }

    @Post('/templates')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true,
        exclude: ["id"]
    })
    async saveTemplate(request: Request, response: Response, next: NextFunction){
        const template: Template = request.body as Template;
        const templateSaved: Template = await this._templateService.saveTemplate({request, response, next}, template);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "saveTemplate",
            service: SERVICE_NAME,
            date: new Date(),
            data: templateSaved
        }));
    }

    @Put('/templates/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async updateTemplate(request: Request, response: Response, next: NextFunction){
        const template: Template = request.body as Template;
        const templateUpdated: Template = await this._templateService.updateTemplateById({request, response, next}, template);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "updateTemplate",
            service: SERVICE_NAME,
            date: new Date(),
            data: templateUpdated
        }));
    }

    @Delete('/templates/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async deleteTemplate(request: Request, response: Response, next: NextFunction){
        const templateId: number = Number(request.params['id']);
        const template: Template = await this._templateService.deleteTemplateById({request, response, next}, templateId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "deleteTemplate",
            service: SERVICE_NAME,
            date: new Date(),
            data: null
        }));
    }
}