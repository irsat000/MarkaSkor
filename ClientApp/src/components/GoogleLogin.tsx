import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { handleError, defaultFetchPost } from '../utility/fetchUtils';

const googleSuccess = async (credentialResponse: any) => {

    const payloadGoogleAuth = {
        credential: credentialResponse.credential
    };

    await fetch('https://localhost:7165/api/oauth-auth', defaultFetchPost(payloadGoogleAuth))
        .then((res) => {
            switch (res.status) {
                case 409:
                    throw new Error('User has already registered with other oauth services using this email address');
                case 508:
                    throw new Error('Creating unique username has failed after many tries');
                case 400:
                    throw new Error('Bad request');
                case 500:
                    throw new Error('Server error');
                case 200:
                    return res.json();
                default:
                    throw new Error(`HTTP error! status: ${res.status}`);
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