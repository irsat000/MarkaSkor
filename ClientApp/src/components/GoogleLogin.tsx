import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { handleError, defaultFetchPost } from '../utility/fetchUtils';
import { loginUser, readUser } from '../utility/authUtils';
import { UserContext } from '../context/AuthContext';

const googleSuccess = async (credentialResponse: any, toggleLoginModal: (() => void) | null, setUserData: any) => {

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
            // Closes login modal if the GoogleLogin is inside login modal
            if (toggleLoginModal != null) {
                toggleLoginModal();
            }
            // Write the token as cookie
            loginUser(data.token);
            // Decode user data from cookie jwt
            const readUserData = readUser() as any;
            // Set user data to UserContext for centralizing
            setUserData({
                unique_name: readUserData.unique_name,
                email: readUserData.email,
                full_name: readUserData.full_name
            });
        }).catch(handleError);
}

const googleFailure = () => {
    throw new Error('Login Failed');
}

export const LoginWithGoogle: React.FC<{
    toggleLoginModal: (() => void) | null
}> = ({ toggleLoginModal }) => {
    const { setUserData } = useContext(UserContext);
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => googleSuccess(credentialResponse, toggleLoginModal, setUserData)}
            onError={googleFailure}
        />
    )
};