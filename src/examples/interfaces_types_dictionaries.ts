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

