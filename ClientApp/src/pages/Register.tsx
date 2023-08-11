import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';
import { handleError, defaultFetchHeaders, strPayload, refactorPhoneNumber } from '../utility/fetchUtils';



// Phone number input that takes care of formatting.
// With this method, user can safely enter their number without making mistakes.
const PhoneNumberInput: React.FC<{ phoneNumber: string, setFormData: (e: any) => void }> = ({ phoneNumber, setFormData }) => {

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

        setFormData((prevData: any) => ({
            ...prevData,
            phoneNumber: formattedInput
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
        fullName: ''
    });

    const [formErrors, setFormErrors] = useState({
        emailPrefix: false,
        password: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Reset all input errors to false at every submit
        setFormErrors({
            emailPrefix: false,
            password: false
        });

        // Check if required fields are empty
        let updatedErrors = {};
        if (formData.emailPrefix.trim().length < 3) {
            updatedErrors = {
                ...updatedErrors,
                emailPrefix: true
            };
        }
        if (formData.password.trim().length < 3) {
            updatedErrors = {
                ...updatedErrors,
                password: true
            };
        }
        if (Object.keys(updatedErrors).length > 0) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                ...updatedErrors
            }));
            return;
        }

        const payload = {
            phoneNumber: refactorPhoneNumber(formData.countryCode, formData.phoneNumber),
            email: formData.emailPrefix + formData.emailDomain,
            password: formData.password,
            username: formData.fullName != "" ? formData.fullName : null
        };

        await fetch('https://localhost:7165/api/register', {
            method: 'POST',
            headers: defaultFetchHeaders,
            body: strPayload(payload)
        })
            .then((res) => {
                if (res.status === 404) {
                    throw new Error('Not found');
                } else if (res.status === 500) {
                    throw new Error('Server error');
                } else if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data.message);
                setFormData({
                    phoneNumber: '',
                    countryCode: '',
                    emailPrefix: '',
                    emailDomain: '',
                    password: '',
                    fullName: ''
                });
            }).catch(handleError);
    };

    return (
        <form className='register_form' onSubmit={handleSubmit}>
            <div className='re-user_info'>
                <span>Numara</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <PhoneNumberInput phoneNumber={formData.phoneNumber} setFormData={setFormData} />
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
                            className={`${formErrors.emailPrefix ? 'input_error' : ''}`}
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
                            className={`${formErrors.password ? 'input_error' : ''}`}
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
