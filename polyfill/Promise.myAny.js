const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise1");
    }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise2");
    }, 100);
});

const promise3 = 4

Promise.any([promise1, promise2, promise3]).then((res) => {
    console.log(res);
})
.catch(error => {
    console.error(error);
});


Promise.myAny = function(arrayOfPromises){
    
    return new Promise((resolve, reject) =>{
        const errors = []
        let conuter = 0
        for(let index=0; index < arrayOfPromises.length; index++){
            arrayOfPromises[index].then((res) =>{
                resolve(res)
            })
            .catch((err) =>{
                errors[index] = err
                conuter ++
                if(conuter === arrayOfPromises.length){
                    reject(errors)
                }
            })
        }
    });
}

Promise.myAny([promise1, promise2, promise3]).then((res) => {
    console.log(res);
})
.catch(error => {
    console.error(error);
});