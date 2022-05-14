const cloneDeep = (obj={},map = new Map()) => {
    if(typeof obj !== 'object') return obj;
    if(map.has(obj)) return map.get(obj)
    let result = Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
    // 防止循环引用
    map.set(obj, result);
    for(let item in obj) {
        // 保证 key 不是原型属性
        if (obj.hasOwnProperty(item)) {
            result[item] = cloneDeep(obj[item], map)
        }
    }
    return result
}