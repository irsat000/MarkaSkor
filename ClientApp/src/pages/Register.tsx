import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';



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

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const refactorPhoneNumber = (countryCode: string, phoneNumber: string): string => {
        return (countryCode + phoneNumber).replace(/[\(\) \-]/g, "");
    };

    /*const checkReponse = async (response: any) : Promise<any> => {
        return response.ok ? response.json() : Promise.reject();
    }*/

    const handleFetchResponse = (response: Response): Promise<any> => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    const handleFetchCatch = (error: any) => {
        console.log(error);
    }

    const defaultFetchHeaders = {
        'Content-Type': 'application/json'
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            phoneNumber: (formData.countryCode + formData.phoneNumber).replace(/[\(\) \-]/g, ""),
            email: formData.emailPrefix + formData.emailDomain,
            password: formData.password,
            username: formData.fullName != "" ? formData.fullName : null
        };

        await fetch('https://localhost:7165/api/register', {
            method: 'POST',
            headers: defaultFetchHeaders,
            body: JSON.stringify(payload)
        })
            .then(handleFetchResponse)
            .then((data) => {
                if (1 == 1) {
                    console.log(data);

                    setFormData({
                        phoneNumber: '',
                        countryCode: '',
                        emailPrefix: '',
                        emailDomain: '',
                        password: '',
                        fullName: ''
                    });
                } else {
                    console.error('Error registering:', data);
                    // Handle registration error, show appropriate messages to the user
                }
            }).catch(handleFetchCatch);

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
