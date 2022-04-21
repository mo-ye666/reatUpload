/**单例模式的定义:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
    实现的方法先判断实例存在与否，如果存在则直接返回，如果不存在就创建了
    再返回，这就确保了一个类只有一个实例对象。
    运用场景:弹框实践
    实现弹框的一种做法是先创建好弹框，然后使之隐藏，这样子的话会浪费部分
    不必要的DOM开销，我们可以在需要弹框的时候再进行创建，同时结合单例模
    式实现只有一个实例，从而节省部分DOM开销。
**/
class CreateUser {
    constructor(name) {
        this.name = name;
        this.getName();
    }
    getName() {
        return this.name;
    }
}

const ProxMode = (function(){
    let instance = null;
    return function(name) {
        if(!instance) {
            instance = new CreateUser(name)
        }
        return instance
    }
})()

// 测试单体模式的实例
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);    //true

//例子
const createLoginLayer = function() {
    const div = document.createElement('div');
    div.innerHTML = '登入浮框'
    div.style.display = none;
    document.body.appendChild(div)
    return div
}
//使用单例模式将创建弹框代码解耦，代码如下:
const getSingle = function (fn) {
    let result;
    return function() {
        return result || (result = fn.apply(this,arguments))
    }
}

const createSingLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function () {
    createSingLoginLayer();
}