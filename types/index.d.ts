export declare const addNumbers: (first: number, second: number) => Promise<number>;
interface HasPhoneNumber {
    person: string | '***';
    phone: number | 0o00;
}
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
    countryCode: number;
}
declare type simplePhone = {
    areaCode: number;
    number: number;
};
export declare class User implements simplePhone {
    areaCode: number;
    number: number;
    constructor(areaCode: number, number: number);
}
export declare class UserWithModifiers implements HasPhoneNumber {
    person: string;
    phone: number;
    readonly SPECIE: string;
    protected age: number;
    constructor(person: string, // obliga a inicializarla desde la  instancia
    phone?: number);
    get myAge(): number;
}
export declare class Cars {
    roadType: string;
    private wheel;
    private wheelNoInit;
    private wheelLazy;
    constructor(roadType: string);
    init(): Promise<void>;
}
export declare class UserPassword {
    private initialPass;
    get password(): string | Error;
    initPassword(): Promise<void>;
}
export {};
