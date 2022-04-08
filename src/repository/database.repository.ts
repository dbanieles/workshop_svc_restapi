import { Injectable } from "@decorators/di";
import { Connection, Repository } from "typeorm";
import { Inject } from "../decorators/inject.decorator";
import { IRepositoty } from "../models/database.model";
import { DatabaseContextService } from "../services/database.service";

@Injectable()
export class DatabaseRepository<T> implements IRepositoty<T> {

    @Inject(DatabaseContextService)
    private _dbContext: DatabaseContextService<T>;

    async Repository<T>(entity: T): Promise<Repository<T>> {
        return (await this._dbContext.Context() as Connection).getRepository(entity as any);
    }

}

