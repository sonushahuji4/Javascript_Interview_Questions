const arr = [1,2,3,4,[[5,6]]]

const flatenArr = arr.flat(2)
console.log(flatenArr)


Array.prototype.myFlat = function(deepth){
    const newArr = []
    if(!Array.isArray(this)){
        throw new Error(`${this}.flat is not a function`)
    }
    this.forEach((item) =>{
        if(Array.isArray(item) && deepth > 0){
            newArr.push(...item.myFlat(deepth-1))
        }else{
            newArr.push(item)
        }
    })
    return newArr
}

const flatenModifiedArr = arr.myFlat(2)
console.log(flatenModifiedArr)