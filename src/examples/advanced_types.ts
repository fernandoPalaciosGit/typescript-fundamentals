// KEYOF
export type PhoneContact = {
    mobile: number;
    home: number;
};

export type EmailContact = {
    address: string;
};

export interface ContactTypes {
    email: EmailContact;
    phone: PhoneContact;
    fax: { line: number }
}

const contact = <T extends keyof ContactTypes>(method: T, contact: ContactTypes[T]): void => {
}

contact('fax', { line: 654 });
contact('email', { address: 'string' });
contact("phone", { home: 654, mobile: 987 });
contact("test", { home: 654, mobile: 987 }); // $ExpectError Argument of type '"test"' is not assignable to parameter of type '"email" | "phone" | "fax"'.
contact("email", { home: 654, mobile: 987 }); // $ExpectError Argument of type '{ home: number; mobile: number; }' is not assignable to parameter of type 'EmailContact'.

// TYPEOF :  se utiliza a modo de query de un typo
export type TypePromise = typeof Promise.resolve; // ¿what return the type of Promise.resolve?
export type TypePromiseSame = Promise<Response>;

// INFER --> solo se puede usar en genericos para calcular con ternarios el tipo de valor
export type EventualType<T> = T extends Promise<infer S> ? S : T

let test: EventualType<number[]>;
let testTest: EventualType<Promise<number>>;

// PARTIAL TYPE ---> es como un Object.assign que permite tener un TIPO OPCIONAL
export type Notebook = Partial<ContactTypes>;
export type Identifier = { dni: number };
const myNotes: Notebook | Identifier = { dni: 654, fax: { line: 654 } }; // could implement ContactTypes or not

// PICK TYPE ---> restringe las propiedades del tipo
export type OnlyCatch<T> = Pick<Promise<T>, 'catch'>;
const asyncStuff: OnlyCatch<number> = new Promise(() => {
});
asyncStuff.catch(() => {
});
asyncStuff.then(() => { // $ExpectError Property 'then' does not exist on type 'Pick  , "catch">'.
});

// ---------------------
export type Dairy = Pick<ContactTypes, 'phone'>;
const myDairy: Dairy = { // you could only pick phone
    phone: {
        mobile: 654,
        home: 654
    }
};
