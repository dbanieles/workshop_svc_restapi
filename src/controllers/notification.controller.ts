import { Controller, Delete, Get, Post, Put } from "@decorators/express";
import { Inject } from "../decorators/inject.decorator";
import { Notification } from "../models/nofication.model";
import { NotificationService } from "../services/notification.service";
import { Request, Response, NextFunction } from 'express';
import { HttpStauts, HttpStautsMessage } from "../models/http.model";
import { HttpResponse } from "../models/response.model";
import { API_BASE_URL, SERVICE_NAME } from "../utils/costants";
import { Trycatch } from "../decorators/catch.decorator";
import { Args } from "../decorators/args.decorator";
import { NotificationEntity } from "../entities/notification.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller(API_BASE_URL)
export class NotificationController {

    @Inject(NotificationService)
    private _notificationService: NotificationService;

    constructor(){ }

    @Get('/notifications')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getNotifications(request: Request, response: Response, next: NextFunction){
        const notifications: Notification[] = await this._notificationService.getNotifications({request, response, next});
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getNotifications",
            service: SERVICE_NAME,
            date: new Date(),
            data: notifications
        }));
    }

    @Get('/notifications/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getNotification(request: Request, response: Response, next: NextFunction){
        const notificationId: number = Number(request.params['id']);
        const notification: Notification = await this._notificationService.getNotificationById({request, response, next}, notificationId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getNotification",
            service: SERVICE_NAME,
            date: new Date(),
            data: notification
        }));
    }

    @Post('/notifications')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true,
        exclude: ["id"]
    })
    async saveNotification(request: Request, response: Response, next: NextFunction){
        const notification: Notification = request.body as Notification;
        const notificationSaved: NotificationEntity = await this._notificationService.saveNotification({request, response, next}, notification);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "saveNotification",
            service: SERVICE_NAME,
            date: new Date(),
            data: notificationSaved
        }));
    }

    @Put('/notifications/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async updateNotification(request: Request, response: Response, next: NextFunction){
        const notification: Notification = request.body as Notification;
        const notificationUpdated: UpdateResult = await this._notificationService.updateNotificationById({request, response, next}, notification);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "updateNotification",
            service: SERVICE_NAME,
            date: new Date(),
            data: notificationUpdated
        }));
    }

    @Delete('/notifications/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async deleteNotification(request: Request, response: Response, next: NextFunction){
        const notificationId: number = Number(request.params['id']);
        const notificationDeleted: DeleteResult = await this._notificationService.deleteNotificationById({request, response, next}, notificationId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "deleteNotification",
            service: SERVICE_NAME,
            data: notificationDeleted,
            date: new Date()
        }));
    }

}