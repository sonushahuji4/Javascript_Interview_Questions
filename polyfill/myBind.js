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

const newFun = personAge.bind(personOne)
newFun(100)

Function.prototype.myBind = function(obj={}, ...args1){
    if(typeof this !== 'function'){
        throw new Error('Not callable')
    }
    obj.fn = this
    return function(...args2){
        obj.fn(...args1, ...args2)
    }
}

const newFunOne = personAge.myBind(personOne)
newFunOne(100)


Function.prototype.Bind = function(scope, ...args){
    scope._this = this
    return function(){
        return scope._this(...args)
    }
}
