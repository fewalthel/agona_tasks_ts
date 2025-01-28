"use strict";
/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.add = add;
exports.subtract = subtract;
exports.prop = prop;
exports.pipe = pipe;
function map(mapper, input) {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput) {
            return subInput.map(mapper);
        };
    }
    return input.map(mapper);
}
function filter(filterer, input) {
    if (arguments.length === 0) {
        return filter;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput) {
            return subInput.filter(filterer);
        };
    }
    return input.filter(filterer);
}
function reduce(reducer, initialValue, input) {
    if (arguments.length === 0) {
        return reduce;
    }
    if (arguments.length === 1) {
        return function (initialValue) { return function (input) { return input.reduce(reducer, initialValue); }; };
    }
    if (arguments.length === 2) {
        return function (input) { return input.reduce(reducer, initialValue); };
    }
    return input.reduce(reducer, initialValue);
}
function add(a, b) {
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return function (subB) { return a + subB; };
    }
    return a + b;
}
function subtract(a, b) {
    if (arguments.length === 0) {
        return subtract;
    }
    if (arguments.length === 1) {
        return function (subB) { return a - subB; };
    }
    return a - b;
}
function prop(obj, propName) {
    if (arguments.length === 0) {
        return prop;
    }
    if (arguments.length === 1) {
        return function (subPropName) { return obj[subPropName]; };
    }
    return obj[propName];
}
/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */
function pipe() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        var nextArguments = Array.from(arguments);
        var result;
        for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
            var func = functions_1[_i];
            result = func.apply(void 0, nextArguments);
            nextArguments = [result];
        }
        return result;
    };
}
