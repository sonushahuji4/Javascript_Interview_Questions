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

personAge.call(personOne,100)


Function.prototype.myCall = function(obj={}, ...args){
    if(typeof this !== "function"){
        throw new Error("Not callable")
    }

    obj.fn = this
    obj.fn(...args)
}

personAge.myCall(personOne,100)