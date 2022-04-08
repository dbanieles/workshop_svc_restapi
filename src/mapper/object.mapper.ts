import { User } from "../models/user.model";


export class Mapper<T,K> {

    toObject(object: T): K {
        let result: K = <K>{};
    
        Object.keys(object).map((key: string) => {
            if (this._instanceOf<T>(object, key)) {
                result[key] = object[key];
            }
        });
    
        return result;
    };

    toArray(objects: T[]): K[] {
        let result: K[] = [];

        objects.forEach((object: T)=> {
            let obj: K = <K>{};

            Object.keys(object).map((key: string) => {
                if (this._instanceOf<T>(object, key)) {
                    obj[key] = object[key];
                }
            });

            result.push(obj);
        });

        return result;
    };
    
    private _instanceOf<T>(object: any, key: string): object is K {
        return key in object;
    }
}