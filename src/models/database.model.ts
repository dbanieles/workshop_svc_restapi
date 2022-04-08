import { Repository } from "typeorm";

export interface IRepositoty<T> {
    Repository<T>(entity: T): Promise<Repository<T>>;
}