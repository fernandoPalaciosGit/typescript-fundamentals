const timeout = (timer: number) =>
    new Promise((resolve) => setTimeout(resolve, timer));

export const addNumbers = async (first: number, second: number) => {
    await timeout(500);
    return first + second;
};

addNumbers(5, 4).then(console.log);

// INFERENCIA DE TIPOS
let test = 'testing';
test = 87; // ALERT

const testObj = {test: 897};
testObj.test = new Date(); // ALERT

// TOP TYPE
let testTopType; // ==== let testTopType: any;
testTopType = 456;
testTopType = new Date();
