import { Controller, Delete, Get, Post, Put } from "@decorators/express";
import { UserSerivce } from "../services/user.service";
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts, HttpStautsMessage} from "../models/http.model";
import { Inject } from '../decorators/inject.decorator';
import { Trycatch } from "../decorators/catch.decorator";
import { UserEntity } from "../entities/user.entity";
import { User } from "../models/user.model";
import { Args } from "../decorators/args.decorator";
import { API_BASE_URL, SERVICE_NAME } from "../utils/costants";

@Controller(API_BASE_URL)
export class UserController {

    @Inject(UserSerivce)
    private _userService: UserSerivce;

    constructor(){ }

    @Get('/users')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    async getUsers(request: Request, response: Response, next: NextFunction){
        const users: User[] = await this._userService.getUsers({request, response, next});
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getUsers",
            service: SERVICE_NAME,
            date: new Date(),
            data: [
                {
                    id: 1,
                    name: 'Daniele',
                    email: 'daniele.baggio@bitsrl.net',
                    password: 'test123',
                    course: 'devops'
                },
                {
                    id: 2,
                    name: 'Davide',
                    email: 'davide.rossi@bitsrl.net',
                    password: 'test123',
                    course: 'devops'
                },
                {
                    id: 3,
                    name: 'Marco',
                    email: 'marco.verdi@bitsrl.net',
                    password: 'test123',
                    course: 'devops'
                }
            ]
        }));
    }

    @Get('/users/filter/:term')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getFiltredUser(request: Request, response: Response, next: NextFunction){
        const term: string = String(request.params['term']);
        const users: User[] = await this._userService.getUserbyTerm({request, response, next}, term);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "getUser",
            service: SERVICE_NAME,
            date: new Date(),
            data: users
        }));
    }

    @Get('/users/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async getUser(request: Request, response: Response, next: NextFunction){
        const userId: number = Number(request.params['id']);
        const user: User = await this._userService.getUsersById({request, response, next}, userId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.BAD_ARGS,
            context: "getUser",
            service: SERVICE_NAME,
            date: new Date(),
            data: user
        }));
    }

    @Post('/users')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true,
        exclude: ["id"]
    })
    async saveUser(request: Request, response: Response, next: NextFunction){
        const user: User = request.body as User;
        const userUpdated: UserEntity = await this._userService.saveUser({request, response, next}, user);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "saveUser",
            service: SERVICE_NAME,
            date: new Date(),
            data: userUpdated
        }));
    }

    @Put('/users/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async updateUser(request: Request, response: Response, next: NextFunction){
        const userId: number = Number(request.params['id']);
        const user: User = request.body as User;
        const userUpdated: UserEntity = await this._userService.updateUsersById({request, response, next}, userId, user);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "updateUser",
            service: SERVICE_NAME,
            date: new Date(),
            data: userUpdated
        }));
    }

    @Delete('/users/:id')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async deleteUser(request: Request, response: Response, next: NextFunction){
        const userId: number = Number(request.params['id']);
        const user: User = await this._userService.getUsersById({request, response, next}, userId);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "deleteUser",
            service: SERVICE_NAME,
            date: new Date()
        }));
    }

}