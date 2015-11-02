/**
 * class decorator desc.
 * @decorator {class}
 * @param {class} target - the class to be decorated
 * @return {class} - the decorated class
 */
export default function classDecorator(target){
}

/**
 * static property decorator desc.
 * @decorator {Sproperty}
 * @param {class} target - the class to be decorated
 * @param {string} attr - the property name
 * @param {Object} descriptor - the property descriptor
 * @return {Object} - the decorated property descriptor
 */
export function staticPropertyDecorator(target, attr, descriptor) {
}

/**
 * static method decorator desc.
 * @decorator {Smethod}
 * @param {class} target - the class to be decorated
 * @param {string} attr - the method name
 * @param {Object} descriptor - the method descriptor
 * @return {Object} - the decorated method descriptor
 */
export function staticMethodDecorator(target, attr, descriptor){
};

/**
 * instance property decorator desc.
 * @decorator {Iproperty}
 * @param {Object} target - the instance to be decorated
 * @param {string} attr - the property name
 * @param {Object} descriptor - the property descriptor
 * @return {Object} - the decorated property descriptor
 */
export function instancePropertyDecorator(target, attr, descriptor) {
}

/**
 * instance method decorator desc.
 * @decorator {Imethod}
 * @param {Object} target - the instance to be decorated
 * @param {string} attr - the method name
 * @param {Object} descriptor - the method descriptor
 * @return {Object} - the decorated method descriptor
 */
export function instanceMethodDecorator(target, attr, descriptor){
};

/**
 * static/instance property decorator desc.
 * @decorator {property}
 * @param {(class|Object)} target - the class/instance to be decorated
 * @param {string} attr - the property name
 * @param {Object} descriptor - the property descriptor
 * @return {Object} - the decorated property descriptor
 */
export function propertyDecorator(target, attr, descriptor) {
}

/**
 * static/instance method decorator desc.
 * @decorator {method}
 * @param {(class|Object)} target - the class/instance to be decorated
 * @param {string} attr - the method name
 * @param {Object} descriptor - the method descriptor
 * @return {Object} - the decorated method descriptor
 */
export function methodDecorator(target, attr, descriptor){
};

/**
 * class/method/property decorator desc.
 * @decorator {(class|method|property)}
 * @param {(class|Object)} target - the class/instance to be decorated
 * @param {string} [attr] - the method/property name
 * @param {Object} [descriptor] - the method/property descriptor
 * @return {Object} - the decorated class or method/property descriptor
 */
export function classMethodPropertyDecorator(target, attr, descriptor){
};
