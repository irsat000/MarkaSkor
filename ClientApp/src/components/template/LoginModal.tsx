import React, { useState, useRef, useEffect } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { LoginWithGoogle } from '../../components/GoogleLogin';
import { handleError, defaultFetchPost } from '../../utility/fetchUtils';


export const LoginModal: React.FC<{
    modalActive: boolean,
    toggleLoginModal: () => void
}> = ({ modalActive, toggleLoginModal }) => {

    // To check where the click even happened so we can on/off the login modal
    const refLoginModal = useRef<any>(null);

    // Clicking the dark background closes the drawer with toggle function
    const handleClickOutsideLoginModal = (event: any) => {
        if (refLoginModal.current && !refLoginModal.current.contains(event.target)) {
            toggleLoginModal();
        }
    };

    // Form data manager
    const [formData, setFormData] = useState({
        userIdentifier: '',
        password: ''
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };


    const payload_login = {
        userIdentifier: formData.userIdentifier.trim(),
        password: formData.password
    };

    // Login form submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await fetch('https://localhost:7165/api/login', defaultFetchPost(payload_login))
            .then((res) => {
                switch (res.status) {
                    case 400:
                        throw new Error('Invalid credentials');
                    case 404:
                        throw new Error('User not found');
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
                toggleLoginModal();
            }).catch(handleError);
    }

    return (
        <div className={`login-modal-cont ${modalActive ? 'active' : ''}`} onClick={handleClickOutsideLoginModal}>
            <form className='login-modal' onSubmit={handleSubmit} ref={refLoginModal}>
                <div className='lm-close-icon' onClick={toggleLoginModal}>
                    <XLg />
                </div>
                <span className='lm-header'>Giriş yap</span>
                <div className='lm-body'>
                    <input
                        type='text'
                        name="userIdentifier"
                        placeholder='Kullanıcı Adı / Email'
                        value={formData.userIdentifier}
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name="password"
                        placeholder='Şifre'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className='lm-action-cont'>
                        <a href="#">Şifremi unuttum</a>
                        <button type='submit'>Giriş yap</button>
                    </div>
                </div>
                <div className='lm-oauth-header'>
                    <div></div>
                    <span>ya da</span>
                    <div></div>
                </div>
                <div className='lm-oauth-buttons'>
                    <LoginWithGoogle toggleLoginModal={toggleLoginModal} />
                </div>
            </form>
        </div>
    )
}