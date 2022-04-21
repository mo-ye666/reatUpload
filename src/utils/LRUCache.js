/**
 * 双向链表节点-数据结构
 * @param {number}_key 键
 * @param {number} _val 值
 */
const DLinkNode = function (_key,_val) {
    this.key = _key
    this.val = _val;
    this.prev = null;
    this.next = null;
}


/**
 * @param {number} capacity 
 */
const LRUCache = function (capacity) {
    //重点思想:hash 映射表定位，链表增删移动
    //初始化，首尾相接
    this.head = new DLinkNode();
    this.tail = new DLinkNode();
    this.head.next = this.tail;
    this.tail.prev = this.head
    this.size = 0;
    this.cache = new Map(); //hash映射表
    this.capacity = capacity; //缓存大小
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    //获取hash映射表key对应的数据
    //存在,将该数据键值对提起到首位并返回对应 数据
    //不存在,返回 -1
    const node = this.cache.get(key)
    if(node) {
        this.moveToHead(node)
        return node.val
    } else {
        return -1
    }
}

/**
 * @param {number} key 
 * @param {number} value 
 * @return {void} 
 */
LRUCache.prototype.put = function(key,value) {
    //获取hash映射表key所对应的数据
    const node = this.cache.get(key)
    if(node) {
        //存在，更新数据，将该节点移到首位
        node.val = value;
        this.moveToHead(node);
    } else {
        //不存在,创建节点移动到 首节点
        const node = new DLinkNode(key,value);
        this.cache.set(key,node)
        this.addHead(node)
        if(++this.size > this.capacity) {
            //内存溢出
            //1.移出尾节点
            //2.删除hash映射表中的数据
            //3.将cache缓存实际大小减1
            const tail = this.deleteTail();
            this.cache.delete(tail.key)
            --this.size
        }
    }
}

LRUCache.prototype.addHead = function(node) {
    //插入节点，首先要将插入的节点于其他节点建立关系
    //然后，再将其他节点的关系改编成与插入节点的关系
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
}

LRUCache.prototype.removeNode = function(node) {
    //删除节点，直接将要删除的节点跳过即可
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

LRUCache.prototype.moveToHead = function(node) {
    this.removeHead(node);
    this.addHead(node);
}

LRUCache.prototype.deleteTail = function(node) {
    const res = this.tail.prev;
    this.removeNode(res);
    return res
}