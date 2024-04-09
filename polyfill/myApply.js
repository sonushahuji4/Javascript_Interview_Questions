// {}

const personOne = {
    name: "Javascript"
}

const personTwo = {
    name: "Java"
}

function personAge (age) {
    console.log(this.name, " is ", age, " old")
}

personAge.apply(personOne,[100])


Function.prototype.myApply = function(obj={}, args){
    if(typeof this !== "function"){
        throw new Error("Not callable")
    }

    if(!Array.isArray(args)){
        throw new Error("TypeError: CreateListFromArrayLike called on non-object")
    }

    obj.fn = this
    obj.fn(...args)
}

personAge.myApply(personOne,[100])