import { Injectable } from "@decorators/di";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Trycatch } from "../decorators/catch.decorator";
import { Inject } from "../decorators/inject.decorator";
import { NotificationEntity } from "../entities/notification.entity";
import { Mapper } from "../mapper/object.mapper";
import { HttpParams } from "../models/http.model";
import { DatabaseRepository } from "../repository/database.repository";
import { Notification } from '../models/nofication.model';

@Injectable()
export class NotificationService {

    @Inject(DatabaseRepository)
    private _database: DatabaseRepository<NotificationEntity>;
    
    @Trycatch({
        context: "Service",
    })
    async getNotifications(httpParams: HttpParams): Promise<Notification[]> {
        const notifications: NotificationEntity[] = await (await this._database.Repository(NotificationEntity as any)).find();
        return new Mapper<NotificationEntity, Notification>().toArray(notifications);
    }

    @Trycatch({
        context: "Service"
    })
    async getNotificationById(httpParams: HttpParams, notificationId: number): Promise<Notification> {
        const notifications: NotificationEntity= await (await this._database.Repository(NotificationEntity as any)).findOne(notificationId);
        return new Mapper<NotificationEntity, Notification>().toObject(notifications);
    }

    @Trycatch({
        context: "Service"
    })
    async saveNotification(httpParams: HttpParams, notification: Notification): Promise<Notification> {
        const notificationsEntity: NotificationEntity = new Mapper<Notification,NotificationEntity>().toObject(notification);
        const repo: Repository<NotificationEntity> = await this._database.Repository(NotificationEntity as any);
        const notificationSaved: NotificationEntity = await repo.save(notificationsEntity);
        return notificationSaved;
    }


    @Trycatch({
        context: "Service"
    })
    async updateNotificationById(httpParams: HttpParams, notification: Notification): Promise<UpdateResult> {
        const notificationsEntity: NotificationEntity = new Mapper<Notification,NotificationEntity>().toObject(notification);
        const repo: Repository<NotificationEntity> = await this._database.Repository(NotificationEntity as any);
        const notificationUpdated: UpdateResult = await repo.update(notification.id, notificationsEntity);
        return notificationUpdated;
    }

    @Trycatch({
        context: "Service"
    })
    async deleteNotificationById(httpParams: HttpParams, notificationId: number): Promise<DeleteResult>{
        const notificationDeleted: DeleteResult = await (await this._database.Repository(NotificationEntity as any)).delete(notificationId);
        return notificationDeleted;
    }


}