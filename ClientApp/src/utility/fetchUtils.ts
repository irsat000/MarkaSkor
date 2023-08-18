
export const handleError = (err: any) => { throw new Error(err); };


export const defaultFetchPost = (payload: any) => {
    const token = "";
    return {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
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
