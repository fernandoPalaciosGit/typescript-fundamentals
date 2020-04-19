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
    constructor(person: string, phone?: number);
    get myAge(): number;
}
export {};
