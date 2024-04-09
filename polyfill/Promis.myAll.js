// {}

/**
 * Promise states or life cycle
 * 1. fulfilled
 * 2. pending
 * 3. rejected
 */

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

Promise.all([promise1, promise2])
    .then(([p1, p2]) => {
        console.log(p1, p2);
    })
    .catch(error => {
        console.error(error);
    });


// Creating new Promise.all
Promise.myAll = function(arrayOfPromises){
    let result = new Array(arrayOfPromises.length); // Initialize result array with the correct length
    let counter = 0;
    let rejected = false; // Flag to track if any promise has rejected

    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise, index) => {
            promise.then((res) =>{
                if (!rejected) { // Check if any promise has rejected
                    result[index] = res;
                    counter++;
                    if(counter === arrayOfPromises.length){ // Resolve when all promises have resolved
                        resolve(result);
                    }
                }
            }).catch((err) =>{
                if (!rejected) { // Reject only once
                    rejected = true;
                    reject(err);
                }
            });
        });
    });
};


Promise.myAll([promise1, promise2])
    .then(([p11, p22]) => {
        console.log(p11, p22);
    })
    .catch(error => {
        console.error(error);
    });