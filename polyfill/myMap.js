const arr = [1,2,3,4,5]

const newArr = arr.map((item) => item * 2)
console.log(newArr)

Array.prototype.myMap = function(cb){
    let newArr = []
    for(let index=0; index < this.length; index++){
        newArr.push(cb(this[index]))
    }
    return newArr
}

const modifiedArr = arr.myMap((item) => item * 2)
console.log(modifiedArr)