import { Injectable } from "@decorators/di";
import { LoginRequest, LoginResponse } from "../models/login.model";
import { User } from "../models/user.model";
// import * as bcrypt from "bcrypt";
// import * as jwt from 'jsonwebtoken';
import { Inject } from "../decorators/inject.decorator";
import { UserSerivce } from "./user.service";
import { HttpParams } from "../models/http.model";
import { Trycatch } from "../decorators/catch.decorator";

@Injectable()
export class OAuthService {

    @Inject(UserSerivce)
    private _userService: UserSerivce;

    @Trycatch({
        context: "Service"
    })
    async login(httpParams: HttpParams, login: LoginRequest): Promise<LoginResponse> {
        const { email, password } = login;
        let loginResponse: LoginResponse = <LoginResponse>{};

        const currentUser: User = await (await this._userService.getUsersByEmail(httpParams, email));

        if(!currentUser) {
            throw new Error(`User with email: ${email} does not exist, please signup and retry!`);
        }

        // const isAuth: boolean = await bcrypt.compare(password, currentUser.password);

        // if(!isAuth) {
        //     throw new Error(`User or password are incorrect, please try again!`);
        // }
 
        // loginResponse.token = jwt.sign({ 
        //     name: currentUser.name, 
        //     email 
        // },
        //     process.env.ENVIRNMENT,
        // {
        //     expiresIn: "2h",
        // });

        return loginResponse;
    }

    async logout(){
        return await "LOGOUT";
    }

}