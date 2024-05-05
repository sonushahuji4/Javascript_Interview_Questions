Array.prototype.sum = function(cb){
    let sum = 0
    for(let i=0; i<this.length; i++){
        sum = sum + this[i];
    }
    return sum
}

arr = [1,1,2,2,]
console.log(arr.sum())