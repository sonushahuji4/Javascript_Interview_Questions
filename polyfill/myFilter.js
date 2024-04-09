const arr = [1,2,3,4,5]

const filteredArr = arr.filter((item)=> item > 2)
console.log(filteredArr)

Array.prototype.myFilter = function(cb){
    let newArr = []
    for(let index=0; index < this.length; index++){
        if(cb(this[index])){
            newArr.push(this[index])
        }
    }
    return newArr
}

const newArr = arr.myFilter((item) => item > 2)
console.log(newArr)