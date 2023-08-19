import { readUserJwt } from "./authUtils";

export const handleError = (err: any) => { throw new Error(err); };


export const defaultFetchPost = (payload: any) => {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    const token = readUserJwt();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }
}
export const defaultFetchGet = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
}

export const defaultFetchHeaders = {
    'Content-Type': 'application/json'
}

export const strPayload = (payload: any) => {
    return JSON.stringify(payload);
}
