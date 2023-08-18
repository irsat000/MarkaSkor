import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { handleError, defaultFetchPost } from '../utility/fetchUtils';

const googleSuccess = async (credentialResponse: any, toggleLoginModal: (() => void) | null) => {

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

            // Closes login modal if the GoogleLogin is inside login modal
            // This might be unnecessary when we refresh the page to sign in the user
            if (toggleLoginModal != null) {
                toggleLoginModal();
            }
        }).catch(handleError);
}

const googleFailure = () => {
    throw new Error('Login Failed');
}

export const LoginWithGoogle: React.FC<{
    toggleLoginModal: (() => void) | null
}> = ({ toggleLoginModal }) => {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => googleSuccess(credentialResponse, toggleLoginModal)}
            onError={googleFailure}
        />
    )
};