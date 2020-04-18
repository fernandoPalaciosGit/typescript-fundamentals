export declare const addNumbers: (first: number, second: number) => Promise<number>;
interface HasPhoneNumber {
    person: string;
    phone: number;
}
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
    countryCode: number;
}
export {};
