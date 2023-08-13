
export const handleError = (err: any) => console.error(err);

export const defaultFetchHeaders = {
    'Content-Type': 'application/json'
}

export const strPayload = (payload: any) => {
    return JSON.stringify(payload);
}

export const refactorPhoneNumber = (countryCode: string, phoneNumber: string): string => {
    return "+" + (countryCode + phoneNumber).replace(/[() -]/g, "");
};