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
