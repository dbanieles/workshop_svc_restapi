import { Injectable } from "@decorators/di";
import { Connection, createConnection, getConnectionManager } from "typeorm";
import { Trycatch } from "../decorators/catch.decorator";
import { NotificationEntity } from "../entities/notification.entity";
import { TemplateEntity } from "../entities/template.entity";
import { UserEntity } from "../entities/user.entity";


@Injectable()
export class DatabaseContextService<T>  {

    @Trycatch({
        context: "Database Connection",
    })
    async Context(): Promise<Connection>{
        const connectionManager = getConnectionManager();

        if(!connectionManager.has("default")){
            return await this.Connection();
        }

        return await connectionManager.get();
    }

    async Connection(): Promise<Connection>{
        return await createConnection({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: (process.env.DATABASE_PORT || 5432) as number,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_USE,
            entities: [
                UserEntity,
                NotificationEntity,
                TemplateEntity
            ],
            synchronize: false,
            logging: true,
        });
    }
}