const arr = [1,2,3,4,5]

// Actualy Method
arr.forEach((item) => console.log(item))

// Created new polyfill method which will mimic as forEach
Array.prototype.myForEach = function(cb){
    for(let index= 0; index < this.length; index++){
        cb(this[index])
    }
}

arr.myForEach((item) => console.log(item))