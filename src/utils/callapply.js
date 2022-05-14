Function.prototype.mayCall = function(context) {
    if(typeof this !== 'function') {
        throw new Error('Type error')
    }
    let args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw new Error('Type error');
    }
    let result = null;
    context = context || window;
    const fnSumbol = Symbol();
    context[fnSymbol] = this;
    if(arguments[1]) {
        result = context[fnSymbol](...arguments[1]);
    } else {
        result = context[fnSymbol]()
    }
    delete context[fnSymbol];
    return result;
}

Function.prototype.myBind = function(context) {
    if(typeof this !== 'function') {
        throw new Error('Type error')
    }
    const args = [...arguments].slice(1);
    const fn = this;
    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}

function myNew(context) {
    const obj = new Object();
    obj.__proto__ = context.prototype;
    const res = context.apply(obj,[...arguments].slice(1));
    return typeof res === 'object' ? res : obj;
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        if(typeof promises[Symbol.iterator] !== 'function') {
            reject('type error')
        } else {
            const res = [];
            let count = 0;
            const len = primises.length;
            for(let i = 0; i < len; i++) {
                Promise.resolve(promises[i])
                .then((data) => {
                    res[i] = data;
                    if(++count === len) {
                        resolve(res)
                    }
                })
                .catch((err) => {
                    reject(err);
                })
            }
        }
    })
}