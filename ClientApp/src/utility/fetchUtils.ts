
export const handleError = (err: any) => { throw new Error(err); };


export const defaultFetchPost = (payload: any) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
}
export const defaultFetchGet = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

export const defaultFetchHeaders = {
    'Content-Type': 'application/json'
}

export const strPayload = (payload: any) => {
    return JSON.stringify(payload);
}

export const refactorPhoneNumber = (countryCode: string, phoneNumber: string): string => {
    return "+" + (countryCode + phoneNumber).replace(/[() -]/g, "");
};