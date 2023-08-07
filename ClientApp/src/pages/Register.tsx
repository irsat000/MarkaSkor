import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';

// Phone number input that takes care of formatting.
// With this method, user can safely enter their number without making mistakes.
const PhoneNumberInput: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const formatPhoneNumber = (input: string) => {
        const cleanedInput = input.replace(/\D/g, '');
        let formattedValue = '';

        if (cleanedInput.length > 0) {
            formattedValue = '(' + cleanedInput.substring(0, 3);
        }
        if (cleanedInput.length > 3) {
            formattedValue += ') ' + cleanedInput.substring(3, 6);
        }
        if (cleanedInput.length > 6) {
            formattedValue += '-' + cleanedInput.substring(6, 10);
        }

        return formattedValue;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const formattedInput = formatPhoneNumber(input);
        setPhoneNumber(formattedInput);
    };

    return (
        <input
            type='text'
            placeholder='Örn; (535) 615 4895'
            value={phoneNumber}
            onChange={handleInputChange}
        />
    );
};


export const Page_Register = () => {

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Kayıt Ol" />
                <main className='main-register'>
                    <form className='register_form'>
                        <div className='re-user_info'>
                            <span>Numara</span>
                            <div className='re-row'>
                                <div className='re-input-cont'>
                                    <PhoneNumberInput />
                                </div>
                                <select>
                                    <option>TR (+90)</option>
                                    <option>USA (+1)</option>
                                    <option>DE (+49)</option>
                                    <option>RU (+7)</option>
                                </select>
                            </div>
                            <span>E-Posta</span>
                            <div className='re-row'>
                                <div className='re-input-cont'>
                                    <input type='text' placeholder='Örn; kemalsunal321' />
                                </div>
                                <select>
                                    <option>@gmail.com</option>
                                    <option>@hotmail.com</option>
                                    <option>@outlook.com</option>
                                </select>
                            </div>
                            <span>Şifre</span>
                            <div className='re-row'>
                                <div className='re-input-cont'>
                                    <input type='password' placeholder='Örn; 123123321' />
                                </div>
                            </div>
                            <span>Ad - Soyad<span>(İsteğe bağlı)</span></span>
                            <div className='re-row'>
                                <div className='re-input-cont'>
                                    <input type='text' placeholder='Örn; Kemal Sunal' />
                                </div>
                            </div>
                        </div>
                        <div className='re-finish'>
                            <button>Kayıt ol</button>
                        </div>
                    </form>
                </main>
            </section>
        </div>
    )
};
