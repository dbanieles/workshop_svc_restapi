import { Container } from "@decorators/di";


export const Inject = <T>(service: T) => {
    return function(target: Object, propertyKey: string) { 
        let value: string;
        const get = function() {
            return Container.get<T>(service as any); 
        };
        const set = function(newVal: string) {
          value = newVal;
          return Container.get<T>(service as any);        
        }; 
        Object.defineProperty(target, propertyKey, { get, set }); 
    }
}
  