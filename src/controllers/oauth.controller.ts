import { Controller, Get, Post } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from "../models/response.model";
import { HttpStauts, HttpStautsMessage} from "../models/http.model";
import { OAuthService } from '../services/oauth.service';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Args } from '../decorators/args.decorator';
import { Trycatch } from '../decorators/catch.decorator';
import { Inject } from '../decorators/inject.decorator';
import { API_BASE_URL, SERVICE_NAME } from '../utils/costants';
import { UserSerivce } from '../services/user.service';
import { User } from '../models/user.model';

@Controller(API_BASE_URL)
export class OAuthController {

    @Inject(OAuthService)
    private _oauthService: OAuthService;

    @Inject(UserSerivce)
    private _userService: UserSerivce;

    constructor(){ }

    @Post('/login')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true
    })
    async login(request: Request, response: Response, next: NextFunction) {
        const loginRequest: LoginRequest = request.body as LoginRequest;
        const loginResponse: LoginResponse = await this._oauthService.login({request, response, next}, loginRequest);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "login",
            service: SERVICE_NAME,
            date: new Date(),
            data: loginResponse
        }));
    }

    @Get('/keepalive/:id')
    keepalive(request: Request, response: Response, next: NextFunction){ }

    @Get('/logout/id')
    logout(request: Request, response: Response, next: NextFunction){ }

    @Post('/register')
    @Trycatch({
        context: "Controller",
        withResponse: true
    })
    @Args({
        required: true,
        exclude:["id"]
    })
    async register(request: Request, response: Response, next: NextFunction){ 
        const user: User = request.body as User;
        const registerdUser: any = await this._userService.saveUser({request, response, next}, user);
        response.status(HttpStauts.SUCCESS).json(new HttpResponse({
            message: HttpStautsMessage.OK,
            status: HttpStauts.SUCCESS,
            context: "register",
            service: SERVICE_NAME,
            date: new Date(),
            data: registerdUser
        }));
    }
}