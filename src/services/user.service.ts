import { Injectable } from "@decorators/di";
import { Like, Repository } from "typeorm";
import { Trycatch } from "../decorators/catch.decorator";
import { Inject } from "../decorators/inject.decorator";
import { UserEntity } from "../entities/user.entity";
import { Mapper } from "../mapper/object.mapper";
import { HttpParams } from "../models/http.model";
import { User } from "../models/user.model";
import { DatabaseRepository } from "../repository/database.repository";

@Injectable()
export class UserSerivce {

    @Inject(DatabaseRepository)
    private _database: DatabaseRepository<UserEntity>;

    @Trycatch({
        context: "Service"
    })
    async getUsers(httpParams: HttpParams): Promise<User[]> {
        const users: UserEntity[] = await (await this._database.Repository(UserEntity as any)).find();
        return new Mapper<UserEntity, User>().toArray(users);
    }

    @Trycatch({
        context: "Service"
    })
    async getUserbyTerm(httpParams: HttpParams, term: string): Promise<User[]>{
        const users: UserEntity[] = await ( await this._database.Repository(UserEntity as any)).find({
            where: [
                { email: Like(`%${term}%`) }
            ]
        })

        return new Mapper<UserEntity, User>().toArray(users);
    }


    @Trycatch({
        context: "Service"
    })
    async getUsersById(httpParams: HttpParams, userId: number): Promise<User>{
        const user: UserEntity = await (await this._database.Repository(UserEntity as any)).findOne(userId);
        return new Mapper<UserEntity, User>().toObject(user);
    }

    @Trycatch({
        context: "Service"
    })
    async getUsersByEmail(httpParams: HttpParams, email: string): Promise<User>{
        const user: UserEntity = await (await this._database.Repository(UserEntity as any)).findOne({ email });
        return new Mapper<UserEntity, User>().toObject(user);
    }

    @Trycatch({
        context: "Service"
    })
    async saveUser(httpParams: HttpParams, user: User): Promise<any>{
        const userEntity: UserEntity = new Mapper<User,UserEntity>().toObject(user);
        const repo: Repository<UserEntity> = await this._database.Repository(UserEntity as any);
        const userSaved: any = await repo.save(userEntity);
        return userSaved;
    }

    @Trycatch({
        context: "Service"
    })
    async updateUsersById(httpParams: HttpParams, userId: number, user: User): Promise<any>{
        const userEntity: UserEntity = new Mapper<User,UserEntity>().toObject(user);
        const repo: Repository<UserEntity> = await this._database.Repository(UserEntity as any);
        const userUpdated: any = await repo.update(userId, userEntity);
        return userUpdated;
    }

    @Trycatch({
        context: "Service"
    })
    async deleteUsersById(httpParams: HttpParams, userId: number): Promise<any>{
        const userDeleted: any = await (await this._database.Repository(UserEntity as any)).delete(userId);
        return userDeleted;
    }


}