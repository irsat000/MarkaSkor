import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';



// Phone number input that takes care of formatting.
// With this method, user can safely enter their number without making mistakes.
const PhoneNumberInput: React.FC<{ setFormData: (e: any) => void }> = ({ setFormData }) => {
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

        setFormData((prevData: any) => ({
            ...prevData,
            ["phoneNumber"]: phoneNumber,
        }));
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

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        countryCode: '90',
        emailPrefix: '',
        emailDomain: '@gmail.com',
        password: '',
        fullName: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const apiPayload = {
            phoneNumber: formData.phoneNumber,
            countryCode: formData.countryCode,
            email: formData.emailPrefix + formData.emailDomain,
            password: formData.password,
            fullName: formData.fullName,
        };

        console.log(apiPayload);

        /*
        try {
            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (1 == 1) {
                        console.log('Registration successful:', data);

                        setFormData({
                            phoneNumber: '',
                            countryCode: '',
                            emailPrefix: '',
                            emailDomain: '',
                            password: '',
                            fullName: '',
                        });
                    } else {
                        console.error('Error registering:', data);
                        // Handle registration error, show appropriate messages to the user
                    }
                });
        } catch (error) {
            console.error('Error registering:', error);
        }*/
    };

    return (
        <form className='register_form' onSubmit={handleSubmit}>
            <div className='re-user_info'>
                <span>Numara</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <PhoneNumberInput setFormData={setFormData} />
                    </div>
                    <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                        <option value='90'>TR (+90)</option>
                        <option value='1'>USA (+1)</option>
                        <option value='49'>DE (+49)</option>
                        <option value='7'>RU (+7)</option>
                    </select>
                </div>
                <span>E-Posta</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <input
                            type='text'
                            name="emailPrefix"
                            value={formData.emailPrefix}
                            onChange={handleChange}
                            placeholder='Örn; kemalsunal321'
                        />
                    </div>
                    <select name="emailDomain" value={formData.emailDomain} onChange={handleChange}>
                        <option value='@gmail.com'>@gmail.com</option>
                        <option value='@hotmail.com'>@hotmail.com</option>
                        <option value='@outlook.com'>@outlook.com</option>
                    </select>
                </div>
                <span>Şifre</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <input
                            type='password'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Örn; 123123321'
                        />
                    </div>
                </div>
                <span>Ad - Soyad<span>(İsteğe bağlı)</span></span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <input
                            type='text'
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Örn; Kemal Sunal'
                        />
                    </div>
                </div>
            </div>
            <div className='re-finish'>
                <button type='submit'>Kayıt ol</button>
            </div>
        </form>
    );
}


export const Page_Register = () => {

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Kayıt Ol" />
                <main className='main-register'>
                    <RegistrationForm />
                </main>
            </section>
        </div>
    )
};
