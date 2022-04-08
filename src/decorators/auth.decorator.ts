

export const IsAuth = () => (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const fn = descriptor.value;
    descriptor.value = function (...args) {
      const result = fn.apply(this, args);
      console.log(args);
      return result;
    };
};