import { Injectable } from "@decorators/di";
import { Repository } from "typeorm";
import { Trycatch } from "../decorators/catch.decorator";
import { Inject } from "../decorators/inject.decorator";
import { Mapper } from "../mapper/object.mapper";
import { HttpParams } from "../models/http.model";
import { DatabaseRepository } from "../repository/database.repository";
import { TemplateEntity } from "../entities/template.entity";
import { Template } from "../models/template.model";

@Injectable()
export class TemplateService {

    @Inject(DatabaseRepository)
    private _database: DatabaseRepository<TemplateEntity>;
    
    @Trycatch({
        context: "Service",
    })
    async getTemplates(httpParams: HttpParams): Promise<Template[]> {
        const templates: TemplateEntity[] = await (await this._database.Repository(TemplateEntity as any)).find();
        return new Mapper<TemplateEntity, Template>().toArray(templates);
    }

    @Trycatch({
        context: "Service"
    })
    async getTemplateById(httpParams: HttpParams, templateId: number): Promise<Template> {
        const template: TemplateEntity = await (await this._database.Repository(TemplateEntity as any)).findOne(templateId);
        return new Mapper<TemplateEntity, Template>().toObject(template);
    }

    @Trycatch({
        context: "Service"
    })
    async saveTemplate(httpParams: HttpParams, template: Template): Promise<Template> {
        const templateEntity: TemplateEntity = new Mapper<Template, TemplateEntity>().toObject(template);
        const repo: Repository<TemplateEntity> = await this._database.Repository(TemplateEntity as any);
        const templateSaved: any = await repo.save(templateEntity);
        return templateSaved;
    }


    @Trycatch({
        context: "Service"
    })
    async updateTemplateById(httpParams: HttpParams, template: Template): Promise<Template> {
        const templateEntity: TemplateEntity = new Mapper<Template, TemplateEntity>().toObject(template);
        const repo: Repository<TemplateEntity> = await this._database.Repository(TemplateEntity as any);
        const templateUpdated: any = await repo.update(template.id, templateEntity);
        return templateUpdated;
    }

    @Trycatch({
        context: "Service"
    })
    async deleteTemplateById(httpParams: HttpParams, templateId: number): Promise<any>{
        const templateDeleted: any = await (await this._database.Repository(Template as any)).delete(templateId);
        return templateDeleted;
    }


}