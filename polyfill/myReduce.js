const arr = [1,2,3,4,5]

const total = arr.reduce((acc,cur) =>{
    return acc += cur
},0)

console.log(total)


Array.prototype.myReduce = function(cb,initialValue){
    let acc = initialValue
    for(let index = 0; index < this.length; index++){
        acc = acc ? cb(acc,this[index]) : this[index]
    }
    return acc
}

const sum = arr.myReduce((acc,cur) =>{
    return acc += cur
},0)

console.log(sum)
