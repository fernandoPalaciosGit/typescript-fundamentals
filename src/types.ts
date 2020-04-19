type PersonAddress = {
    [address: string]: {
        houseNumber: string;
        street: string;
        city: string;
        state: string;
        postalCode: number;
        country: string;
    };
};

type PersonalPhone = {
    [phone: string]: string;
};

export interface ContactPerson {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    salutation?: string;
    email?: string;
    phones: PersonalPhone;
    addresses: PersonAddress;
}
