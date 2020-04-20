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

// INTERFACES VS TYPE ALIASES

// COMBINACION DE TYPES
type stringOrNumber = string | number;
const pets: stringOrNumber = 12;

// INTERSECCION DE TYPES
type hasName = { name: string };
type hasAge = { age: number };
type hasHair = { hairColor?: string };
type isPerson = hasName & hasAge & hasHair;
const nando: isPerson = { name: 'nando', age: 30, hairColor: 'braun' };
const emilio: isPerson = { name: 'nando', age: 30 };

// NO SE PUEDEN AUTO REFERENCIAR LOS TIPOS
type numArray = number[];
type numValue = number | numArray;
type numTuple = numValue[];
const testNumArray: numTuple = [1, 2, 3, [1, 2, 3]]

// INTERFACE INHERITANCE -> UNION
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
    countryCode: number,
}

const localContactOne: HasInternationalPhoneNumber = { countryCode: 654, person: 'nando', phone: 5646544 };
const localContactTwo: HasPhoneNumber | { countryCode: number } = { countryCode: 654, person: 'nando', phone: 5646544 };

// INTERFACES COULD DESCRIBE FUNCTIONS
interface ContactMessage {
    (contact: HasPhoneNumber, message: string): string
}

const contactMessage: ContactMessage = (contact, message) => {
    return `${contact.phone}; ${message}`;
};

// EQUIVALENCIA CON LOS TYPES EN EL NOMBRADO DE LAS FUNCIONES
type ContactMessageByType = (contact: HasPhoneNumber, message: string) => string;

const contactMessageByType: ContactMessageByType = (contact, message) => {
    return `${contact.phone}; ${message}`;
};

// CONTEXTUAL INFERENCE
// se trata de que typescript deduzca el tipo de un argumento por la definicion de otro argumento con la misma firma declarada anteriormente
const ContactMessageByTypeInference: ContactMessageByType = (_contact, _message) => 'test';


// DICTIONARY OBJECTS
interface PhoneNumberDict {
    [person: string]: { // INDEX SIGNATURES
        areaCode: number;
        number: number;
    }
}

const list: PhoneNumberDict = {};
if (typeof list.abc === 'string') { // $ExpectError: typescript detecta que esto nunca ocurrirá
    list.abc
}
const phoneList: PhoneNumberDict = {
    nando: {
        areaCode: 654,
        number: 654
    },
    'juan': {
        areaCode: 654,
        number: 654
    }
};

// COMBINACIÓN DE INTERFACES -> DECLARATION MERGING
type simplePhone = {
    areaCode: number;
    number: number;
}

interface PhonePersonalNumber {
    [person: string]: simplePhone
}

interface PhonePersonalNumber {
    home: simplePhone,
    work: simplePhone
}

const personalNumbersOne: PhonePersonalNumber = { // $ExpectError: home is missing
    work: { areaCode: 654, number: 654 },
}

const personalNumbersTwo: PhonePersonalNumber = {
    home: { areaCode: 654, number: 654 }, // required
    work: { areaCode: 654, number: 654 }, // required
    parents: { areaCode: 654, number: 654 }, // optional
    personal: { areaCode: 654, number: 654 }, // optional
};


type NumValues = 1 | 2;
type NumArrays = NumValues | NumValues[];

interface Index extends Array<NumArrays> {
}

const x: Index = [1, 2, [1, 2]];
const xx: Index = [1, 2, [1, 2, 3]]; // fail because index tuple
const xxx: Index = [1, 3, [1, 2]]; // $ExpectError because index tuple
const xxxx: Index = [1, 2, [1, [1, 2]]]; // $ExpectError because index tuple

// CLASSES BAD
export class User implements simplePhone {
    areaCode: number;
    number: number;

    constructor(areaCode: number, number: number) {
        this.areaCode = areaCode;
        this.number = number;
    }
}

// CLASSES BETTER
export class UserWithModifiers implements HasPhoneNumber {
    readonly SPECIE: string = 'homo sapiens'; // like a final modifier: only access to the same peace of memory (ALERT: not really, only type checker)
    protected age: number = 0;

    constructor(
        public person: string, // obliga a inicializarla desde la  instancia
        public phone: number = 111
    ) {

    }

    // create a public member {this.myAge} to access the protected value
    get myAge() {
        return this.age;
    }
}

const user = new UserWithModifiers('nando');
user.phone // default value : I dont need to instance initialize
user.age // $ExpectError protected member
user.myAge
user.SPECIE = 'do not rewrite'; // $ExpectError readonly modifier -> ALERT: this could be overriden as a library because this Error hasonly expected at rtpescript checker level, not at the result in compiled code.

// CLASSES INITIALIZATION
export class Cars {
    private wheel: number; // $ExpectError siempre se debe inicializar una propiedad privada
    private wheelNoInit: number | undefined // OK: sin inicializar -> el compilado la ignorará si no la usa
    private wheelLazy !: number; // LAZY INITIALIZATION

    constructor(
        public roadType: string
    ) {
        if (roadType === 'deportivo') {
            this.wheel = 2; // $ExpectError falla incluso si se inicializa de esta manera: dependiendo del valor de ora propiedad
        }
    }

    async init() {
        this.wheelLazy = this.wheel;
    }
}

const myCar = new Cars('4x4')
myCar.init().then(() => console.log(myCar));

// LAZY INITIALIZATION WITH ANOTHER PROPERTY
export class UserPassword {
    private initialPass!: string;

    get password(): string | Error {
        if (!this.initialPass) { // not really needed
            throw new Error('not yet initialized')
        }
        return this.initialPass;
    }

    async initPassword(): Promise<void> {
        this.initialPass = '123';
    }
}

const userPass = new UserPassword();
userPass.password // will throw Error
userPass.initPassword().then(() => userPass.password); // would return private initialPass value

// GENERICS
export interface HasNameByInterface<T> {
    name: T;
    age: T;
}

export type HasNameByType<T> = {
    name: T;
    age: T;
}

const testName: HasNameByInterface<string> | HasNameByType<string>
    = { name: 'Jooan', age: '231' };

// con valor por defecto definido
export interface FilterFunction<T = string> {
    (val: T): boolean
}

// se puede inicializar en función de lo que declare la implentacion del metodo, pero por defecto el tipo del generico lo define (en este caso) la interfax
const selectIfString: FilterFunction = (val) => typeof val === "string";
['654'].filter(selectIfString);
[54].filter(selectIfString); // ALERT : valor por defecto es nun string

const selectSomeIfString: FilterFunction<any> = (val) => typeof val === "string";
['654'].filter(selectSomeIfString);
[54].filter(selectSomeIfString);
[true].filter(selectSomeIfString);

// INFERENCIA DE GENERICOS
function resolveOrTimeoutExplicit<Response>(request: Promise<Response>, timeout: number): Promise<Response> {
    /****/
    return new Promise<Response>(() => {
        /****/
    });
}

function resolveOrTimeoutImplicit<T>(request: Promise<T>, timeout: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const taskTimer = setTimeout(() => reject('time out'), timeout);

        request.then((val) => {
            clearTimeout(taskTimer);
            resolve(val);
        });
    });
}

resolveOrTimeoutExplicit(fetch(""), 3000).then((val) => console.log(val));
resolveOrTimeoutImplicit(fetch(""), 3000).then((val) => console.log(val));


// TYPE PARAMETERS (GENERICS) WITH CONSTRAINTS <extends
type ObjectIndex = { id: string };
type ReturnObjectIndex<T extends ObjectIndex> = (array: T[]) => { [val: string]: T }; // todo: ¿it is possible to apply this generic to s function declaration?

const returnDefaultObject = <T extends ObjectIndex>(array: T[]): { [val: string]: T } => {
    const out: { [val: string]: T } = {};
    return array.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
    }, out);
}

const obj = returnDefaultObject([{ id: 'test', code: 'AAA' }]);
returnDefaultObject([{ code: 'AAA' }]); // ALERT el parametro del generico debe extender del tipo ObjectIndex, que contiene un {id: string}
obj.test.code; // el linter nos permite descubrir las propiedades asignadas al objeto {[val: string]: T} gracias a la conversion por ele generico


// SCOPE PARAMETERS
const creatTuple = <T>(val1: T) => {
    // U not accesible at this level
    // return <U>(val2: U): [T, U] => [val1, val2];
    return <U>(val2: U) => [val1, val2] as [T, U];
}

const myTuple = creatTuple('34')(654);
