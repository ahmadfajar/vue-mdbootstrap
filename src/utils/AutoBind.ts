/**
 * Binds all methods of a class instance to itself.
 *
 * @param instance The class instance
 */
export function autoBind(instance: unknown): void {
    for (let obj = instance; obj; obj = Object.getPrototypeOf(obj)) {

        // We're the end of the inheritance chain if we've reached 'Object'.
        if (obj.constructor.name === 'Object') {
            return;
        }

        const names = Object.getOwnPropertyNames(obj);

        // Bind each function to the instance.
        for (let i = 0; i < names.length; i++) {
            const name = names[i];

            // No need to bind getters, as attempting to access them would also
            // invoke them which is something we don't want to do here.
            // @ts-ignore
            if (Object.getOwnPropertyDescriptor(obj, name).get) {
                continue;
            }

            // We're using `defineProperty` here so that we don't make all the
            // class methods enumerable when we replace them.
            // @ts-ignore
            if (typeof obj[name] === 'function' && name !== 'constructor') {
                Object.defineProperty(instance, name, {
                    // @ts-ignore
                    value: instance[name].bind(instance),
                    enumerable: false,
                    configurable: true,
                    writable: true,
                });
            }
        }
    }
}
