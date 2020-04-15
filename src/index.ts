const timeout = (timer: number) =>
    new Promise((resolve) => setTimeout(resolve, timer));

export const addNumbers = async (first: number, second: number) => {
    await timeout(500);
    return first + second;
};

addNumbers(5, 4).then(console.log);

// INICIALIZACION
let objectTest: object;
objectTest.test = 123;

// INFERENCIA DE TIPOS
let test = 'testing';
test = 87; // ALERT

const testObj = { test: 897 };
testObj.test = new Date(); // ALERT

// TOP TYPE
let testTopType; // ==== let testTopType: any;
testTopType = 456;
testTopType = new Date();

// ARRAY
let arrayOne: number[] = []; // array de numeros
let arrayTwo = [123] // array de numeros por inferencia de tipos
arrayOne.push('123'); // ALERT
arrayTwo.push('123'); // ALERT
let arrayThree = []; // BAD -> POR INFERRENCIA DE TIPO = array[]
arrayThree.push('123');

// ARRAY LENGTH AND TYPE VALUES
let arrayFour: [number, string, Date, any] = [132, '132', new Date(123), false];
arrayFour = [132]; // ALERT by length
arrayFour[1] = 876; // ALERT by type
arrayFour[3] = 54654; // CORRECT in this array position : any

// OBJECTS
const objectTestOne: { name: string; age: number } = { name: 'nando', age: 30 };

// UNDEFINED TYPES
const objectTestTwo: { friend?: string } = {}; // CORRECT undefined friend
objectTestTwo.friend = '654'; // CORRECT type
objectTestTwo.friend = 654; // ALERT incorrect type

// INTERFACES : types for an structure
interface PERSON {
    name: string;
    age?: number;
}
let myPerson: PERSON = { name: 'palacios' };
