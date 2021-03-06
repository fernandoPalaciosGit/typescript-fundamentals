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
test = 87; // $ExpectError

const testObj = { test: 897 };
testObj.test = new Date(); // $ExpectError

// TOP TYPE
let testTopType; // ==== let testTopType: any;
testTopType = 456;
testTopType = new Date();

// ARRAY
let arrayOne: number[] = []; // array de numeros
let arrayTwo = [123] // array de numeros por inferencia de tipos
arrayOne.push('123'); // $ExpectError
arrayTwo.push('123'); // $ExpectError
let arrayThree = []; // BAD -> POR INFERRENCIA DE TIPO = array[]
arrayThree.push('123');

// ARRAY LENGTH AND TYPE VALUES
let arrayFour: [number, string, Date, any] = [132, '132', new Date(123), false];
arrayFour = [132]; // $ExpectError by length
arrayFour[1] = 876; // $ExpectError by type
arrayFour[3] = 54654; // CORRECT in this array position : any

// OBJECTS
const objectTestOne: { name: string; age: number } = { name: 'nando', age: 30 };

// UNDEFINED TYPES
const objectTestTwo: { friend?: string } = {}; // CORRECT undefined friend
objectTestTwo.friend = '654'; // CORRECT type
objectTestTwo.friend = 654; // $ExpectError incorrect type

// INTERFACES : types for an structure
interface PERSON {
    name: string;
    age?: number;
}

let myPerson: PERSON = { name: 'palacios' };

// INTERSECTION OR UNION OPERATORS
interface Animal {
    legs: number;
    tail: boolean;
    age: Date;
}

interface DOG_PET {
    bark: boolean;
    age: Date;
    hair: boolean;
}

const wally: DOG_PET & Animal = { age: new Date(), bark: true, hair: false, legs: 4, tail: true };
const my_wally: DOG_PET | Animal = { age: new Date(), bark: true, hair: false, legs: 4 };
console.log(my_wally.hair); // $ExpectError: ony access to the variables hat appears in both interfaces

// FUNCTIONS
// should define spread argument types
const parameters = (...args: number[]) => args.reduce((sum, val) => sum + val, 0);

const getAnimal = (pet: { age: Date }): DOG_PET & Animal => ({ // should return the types expected in the intersection of the interfaces
    legs: 64,
    age: pet.age || new Date(),
    tail: true,
    bark: true,
    hair: false,
});

getAnimal({ age: new Date() }) // should pass the argument expected

// GOOD
function names(person: { myname?: number[] | 'nando' }) {
    return person.myname;
}

// BETTER : de esta manera podemos usar la declaracion de argumentos de ES6 y despues la declaracon de tipos de ypescript
function names2({ myname = 'nando' }: { myname?: number[] | string }): number[] | string {
    return myname;
}

// MUCH BETTER
interface Names {
    myname?: number[] | string
}

const names3 = ({ myname = 'nando' }: Names): Names => ({ myname });

names3({ myname: [1, 2, 3] }) // or array of number
names3({ myname: "nando" }) // or specific value
names3({}) // name could be undefined
names3() // $ExpectError person should be as parameter

// OVERLOAD SIGNATURES
interface HasEmail {
    person: string;
    email: string;
}

interface HasPhoneNumber {
    person: string | '***';
    phone: number | 0o00;
}

function sendEmail(person: HasEmail) {
}

function sendTextMessage(person: HasPhoneNumber) {
}

const sendContact = (
    method: 'email' | 'phone',
    contactList: (HasEmail | HasPhoneNumber)[]
): void => {
    if (method === "email") {
        (contactList as HasEmail[]).forEach(sendEmail)
    } else {
        (contactList as HasPhoneNumber[]).forEach(sendTextMessage)
    }
};

// En este caso no tiene sentido la relación de argumentos, un contacto de tipo email deberia tener el email y viceveersa con el phone
// el problema de aqui es que TS no tiene manera de relacionar la combinacion de tipos en ambos argumentos
sendContact("email", [{ person: 'nando', phone: 654 }]);
sendContact("phone", [{ person: 'nando', email: 'tes' }]);

// SOLUCION: divde y venceras
const sendEmailContact = (method: 'email', contact: HasEmail[]): void =>
    contact.forEach(sendEmail)

const sendPhoneContact = (method: 'phone', contact: HasPhoneNumber[]): void =>
    contact.forEach(sendTextMessage)

sendEmailContact("phone", [{ person: 'nando', phone: 654 }]); // $ExpectError
sendPhoneContact("phone", [{ person: 'nando', email: 'tes' }]); // $ExpectError

// LEXICAL SCOPE
function sendMessage(
    this: HasPhoneNumber & HasEmail, // DEFINICION DEL CONTEXTO DE EJECUCION !!!!!!
    method: 'phone' | 'email'
) {
    if (method === 'phone') {
        sendEmail(this);
    } else {
        sendTextMessage(this);
    }
}

function invokeSoon(callback: Function, timeout: number) {
    setTimeout(() => callback.call(null), timeout);
}

const personWithPhoneAndEmail = { person: 'nando', phone: 654, email: '@test' };
sendMessage('email') // $ExpectError
invokeSoon(() => sendMessage('phone'), 200) //$ExpectError
sendMessage.call(personWithPhoneAndEmail, "phone");
sendMessage.apply(personWithPhoneAndEmail, ["phone"]);
invokeSoon(sendMessage.bind(personWithPhoneAndEmail), 300);
