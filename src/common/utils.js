import { message } from 'ant-design-vue';

// 复制文本到粘贴板
export function copyText(text) {
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.remove();
    message.success('复制成功');
}

// 防抖
export function debounce(func, wait, immediate) {
    let res, timeout, context, args;
    const debounced = function () {
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        if (immediate) {
            const runNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (runNow) res = func.apply(context, args);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
        return res;
    };
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}

// 节流
export function throttle(func, wait) {
    let timeout, context, args;
    return () => {
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                clearImmediate(timeout);
            }, wait);
            func.apply(context, args);
        }
    };
}

// 原始函数
function Fn_init(a, b, c) {
    console.log('最终的结果：', a + b + c);
}
// 柯里化函数
export function curryization(fn, params) {
    // 获取函数参数长度
    const lth = fn.length;
    params = params || [];
    return function (...args) {
        // 收集fn函数的参数
        const newArgs = params.concat(args);
        console.log('newArgs', newArgs);
        if (newArgs.length < lth) {
            // 继续执行curryization柯里化函数，继续收集参数，this指向window
            return curryization.call(this, fn, newArgs);
        } // 所有参数收集完毕，整体执行源函数，this指向window
        return fn.apply(this, newArgs);
    };
}
export const curryFunc = curryization(Fn_init);
// 柯里化函数2
export const curryization2 = (fn, ...args) => (args.length >= fn.length ? fn(...args) : (..._args) => curryization2(fn, ...args, ..._args));
// 无限累加
export function curryAdd(...args) {
    let allArgs = [...args];
    const fn = (...newArgs) => {
        allArgs = [...allArgs, ...newArgs];
        return fn;
    };
    fn.toString = () => {
        if (!allArgs.length) {
            return;
        }
        return allArgs.reduce((sum, cur) => sum + cur);
    };
    return fn;
}

// 写个简单的模板解析器
// const greeting = 'My name is ${name}, age is ${age}, I am a ${job.jobName}';
// const employee = {
//     name: 'billyang',
//     age: 28,
//     job: {
//         jobName: 'designer',
//         jobLevel: 'senior',
//     },
// };
// String.prototype.render = function (params) {
//     const fnStr = `return \`${this}\``;
//     const paramsList = Object.entries(params);
//     const keys = paramsList.map(([k]) => k);
//     const values = paramsList.map(([, v]) => v);
//     const fn = new Function(...keys, fnStr);
//     return fn(...values);
// };
// const result = greeting.render(employee);
// console.log(result);

// 实现一个 NEW
// let p = new Person();
const Person = () => {};
const p = (function () {
    const obj = {};
    // eslint-disable-next-line no-proto
    obj.__proto__ = Person.prototype;

    // 其他赋值语句...
    return obj;
})();
console.log(p);

// 数组扁平化
export function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
// 数组扁平化2
export function flatten2(arr) {
    return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flatten2(item) : item), []);
}

//  实现一个发布订阅模式
export class eventEmitter {
    constructor() {
        this.events = {};
    }
    on(type, callback) {
        if (this.events[type]) {
            this.events[type].push(callback);
        } else {
            this.events[type] = [callback];
        }
    }
    Off(type, callback) {
        if (!this.events[type]) {
            return;
        }
        this.events[type] = this.events.filter((fn) => fn !== callback);
    }
    once(type, callback) {
        const onceFunc = () => {
            callback();
            this.events.off(type, callback);
        };
        this.on(type, onceFunc);
    }
    emit(type, ...res) {
        this.events[type] &&
            this.events[type].forEach((fn) => {
                fn.apply(this, res);
            });
    }
}

/**
 *  实现有并行限制的 Promise 调度器
 *  addTask(1000,"1");
    addTask(500,"2");
    addTask(300,"3");
    addTask(400,"4");
    的输出顺序是：2 3 1 4

    整个的完整执行流程：

    一开始1、2两个任务开始执行
    500ms时，2任务执行完毕，输出2，任务3开始执行
    800ms时，3任务执行完毕，输出3，任务4开始执行
    1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
    1200ms时，4任务执行完毕，输出4
 */
export class Scheduler {
    constructor(limit) {
        this.quene = [];
        this.maxQuene = limit;
        this.runTasks = 0;
    }
    add(time, order) {
        const promiseCreater = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log(order);
                    resolve();
                }, time);
            });

        this.quene.push(promiseCreater);
    }
    request() {
        if (!this.quene || !this.quene.length || this.runTasks >= this.maxQuene) {
            return;
        }
        this.runTasks++;
        this.quene
            .shift()()
            .then(() => {
                this.runTasks--;
                this.request();
            });
    }
    taskStart() {
        for (let i = 0; i < this.maxQuene; i++) {
            this.request();
        }
    }
}
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
    scheduler.add(time, order);
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.taskStart();

//实现一个new 操作符
export const myNew = (fn, ...args) => {
    const obj = Object.create(fn.prototype);
    const res = fn.call(obj, ...args);
    // Person2 要是返回对象，那么这里需要返回的就是Person2返回的对象
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }
    return obj;
};
function Person2(name, age) {
    this.name = name;
    this.age = age;
}
Person2.prototype.say = function () {
    console.log(this.age);
};
const p1 = myNew(Person2, 'lihua', 18);
console.log(p1.name);
console.log(p1);
p1.say();

// 实现一个版本号排序算法
// ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
export const versionSort = (arr) =>
    arr.sort((a, b) => {
        let i = 0;
        const arr1 = a.split('.');
        const arr2 = b.split('.');

        while (true) {
            const s1 = arr1[i];
            const s2 = arr2[i];
            i++;
            if (!s1 || !s2) {
                return arr2.length - arr1.length;
            }

            if (s1 === s2) continue;

            return s2 - s1;
        }
    });

// 实现一个Promise
export class Mypromise {
    constructor(fn) {
        // 表示状态
        this.state = 'pending';
        // 表示then注册的成功函数
        this.successFun = [];
        // 表示then注册的失败函数
        this.failFun = [];

        const resolve = (val) => {
            // 保持状态改变不可变（resolve和reject只准触发一种）
            if (this.state !== 'pending') return;

            // 成功触发时机  改变状态 同时执行在then注册的回调事件
            this.state = 'success';
            // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里为模拟异步
            setTimeout(() => {
                // 执行当前事件里面所有的注册函数
                this.successFun.forEach((item) => item.call(this, val));
            });
        };

        const reject = (err) => {
            if (this.state !== 'pending') return;
            // 失败触发时机  改变状态 同时执行在then注册的回调事件
            this.state = 'fail';
            // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里模拟异步
            setTimeout(() => {
                this.failFun.forEach((item) => item.call(this, err));
            });
        };
        // 调用函数
        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // 实例方法 then

    then(resolveCallback, rejectCallback) {
        // 判断回调是否是函数
        resolveCallback = typeof resolveCallback !== 'function' ? (v) => v : resolveCallback;
        rejectCallback =
            typeof rejectCallback !== 'function'
                ? (err) => {
                      throw err;
                  }
                : rejectCallback;
        // 为了保持链式调用  继续返回promise
        return new Mypromise((resolve, reject) => {
            // 将回调注册到successFun事件集合里面去
            this.successFun.push((val) => {
                try {
                    //    执行回调函数
                    const x = resolveCallback(val);
                    //（最难的一点）
                    // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用  如果是一个promise对象（代表又是一个异步） 那么调用x的then方法 将resolve和reject传进去 等到x内部的异步 执行完毕的时候（状态完成）就会自动执行传入的resolve 这样就控制了链式调用的顺序
                    x instanceof Mypromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            });

            this.failFun.push((val) => {
                try {
                    //    执行回调函数
                    const x = rejectCallback(val);
                    x instanceof Mypromise ? x.then(resolve, reject) : reject(x);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    //静态方法
    static all(promiseArr) {
        const result = [];
        //声明一个计数器 每一个promise返回就加一
        let count = 0;
        return new Mypromise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                //这里用 Promise.resolve包装一下 防止不是Promise类型传进来
                Promise.resolve(promiseArr[i]).then(
                    // eslint-disable-next-line no-loop-func
                    (res) => {
                        //这里不能直接push数组  因为要控制顺序一一对应(感谢评论区指正)
                        result[i] = res;
                        count++;
                        //只有全部的promise执行成功之后才resolve出去
                        if (count === promiseArr.length) {
                            resolve(result);
                        }
                    },
                    (err) => {
                        reject(err);
                    },
                );
            }
        });
    }
    //静态方法
    static race(promiseArr) {
        return new Mypromise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(
                    (res) => {
                        //promise数组只要有任何一个promise 状态变更  就可以返回
                        resolve(res);
                    },
                    (err) => {
                        reject(err);
                    },
                );
            }
        });
    }
}

// 使用
// let promise1 = new Mypromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 2000);
// });
// let promise2 = new Mypromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1234);
//   }, 1000);
// });

// Mypromise.all([promise1,promise2]).then(res=>{
//   console.log(res);
// })

// Mypromise.race([promise1, promise2]).then(res => {
//   console.log(res);
// });

// promise1
//   .then(
//     res => {
//       console.log(res); //过两秒输出123
//       return new Mypromise((resolve, reject) => {
//         setTimeout(() => {
//           resolve("success");
//         }, 1000);
//       });
//     },
//     err => {
//       console.log(err);
//     }
//   )
//   .then(
//     res => {
//       console.log(res); //再过一秒输出success
//     },
//     err => {
//       console.log(err);
//     }
//   );
