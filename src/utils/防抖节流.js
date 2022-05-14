function debounce(func,wait,immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if(timemout) clearTimeout(timeout);
        if(immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            },wait);
            if(callNow) func.apply(context,args);
        } else {
            timeout = setTimeout(function () {
                func.apply(context,args);
            },wait);
        }
    }
}

function throttle(func,wait,immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if(!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context,args);
            },wait)
        }
    }
}

function myInstanceof(target,origin) {
    if(typeof target !== 'object' && type === null) return false;
    if(typeof origin !== 'function')
        throw new TypeError('origin must be a function')
    let proto = Object.getPrototypeOf(target);
    while(proto) {
        if(proto === origin.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

class Scheduler {
    constructor() {
        this.waitTask = []; //待执行的任务队列
        this.excutingTasks = []; // 正在执行的任务队列
        this.maxExcutingNums = 2; // 允许同事运行的任务数量
    }
    add(promiseMaker) {
        if(this.excutingTasks.length < this.maxExcutingNums) {
            this.run(promiseMaker);
        } else {
            this.waitTask.push(promiseMaker)
        }
    }
    run(promiseMaker) {
        const len = this.excutingTasks.push(promiseMaker);
        const index = len - 1;
        promiseMaker().then(
            () => {
                this.excutingTasks.splice(index,1);
                if(this.waitTask.length > 0) {
                    this.run(this.waitTask.shift())
                }
            }
        )
    }
}

const timeout = (time) => 
    new Promise((resolve) => {
        setTimeout(resolve,time)
    })

const scheduler = new Scheduler();
const addTisk = (time,order) => scheduler.add(
    () => timeout(time).then(
        () => {
            console.log(order)
        }
    )
);