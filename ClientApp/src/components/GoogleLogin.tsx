import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { handleError, defaultFetchPost } from '../utility/fetchUtils';

const googleSuccess = async (credentialResponse: any) => {

    const payloadGoogleAuth = {
        credential: credentialResponse.credential
    };

    await fetch('https://localhost:7165/api/oauth-auth', defaultFetchPost(payloadGoogleAuth))
        .then((res) => {
            if (res.status === 409) {
                throw new Error('*');
            } else if (res.status === 400) {
                throw new Error('Bad request');
            } else if (res.status === 500) {
                throw new Error('Server error');
            } else if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
        }).catch(handleError);
}

const googleFailure = () => {
    throw new Error('Login Failed');
}

export const LoginWithGoogle = () => {
    return (
        <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
        />
    )
};