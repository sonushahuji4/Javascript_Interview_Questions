let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        postCodes: {
            firstBlock: 10,
            secondBlock: 12
        }
    }
}

function flatenObject(object, prefix = '') {
  const obj = {};
  for (let key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      const flattened = flatenObject(object[key], `${prefix}${key}.`);
      Object.assign(obj, flattened);
    } else {
      obj[`${prefix}${key}`] = object[key];
    }
  }
  return obj;
}

console.log(flatenObject(person));


const arr = [1, 2, [3, 4], 4, 5];

function flatenArr(arr){
  const newArr = []
  arr.forEach((item) =>{
    if(Array.isArray(item)){
      const itemArr = flaten(item)
      newArr.push(...itemArr) // Concatenate arrays using spread syntax
    } else {
      newArr.push(item)
    }
  });
  return newArr;
}

console.log(flatenArr(arr))