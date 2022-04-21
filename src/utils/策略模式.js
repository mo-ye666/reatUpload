/*
    根据不同参数可以命中不同的策略
    有点 能减少大量的if语句
    复用性好
*/

const S = function(salary) {
    return salary * 4
}

const A = function(salary) {
    return salary * 3
}

const B = function(salary) {
    return salary * 2
}

const calculateBonus = function(func,salary) {
    return func(salary)
}

calculateBonus(A,10000)