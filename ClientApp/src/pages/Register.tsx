import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';
import { handleError, defaultFetchHeaders, strPayload, refactorPhoneNumber } from '../utility/fetchUtils';



// Phone number input that takes care of formatting.
// With this method, user can safely enter their number without making mistakes.
const PhoneNumberInput: React.FC<{ phoneNumber: string, setFormData: (e: any) => void, phoneNumberError: boolean }> = ({ phoneNumber, setFormData, phoneNumberError }) => {

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
            className={`${phoneNumberError ? 'input_error' : ''}`}
        />
    );
};

const RegistrationForm: React.FC<{ formData: any, setFormData: (a: any) => void, activateAForm: () => void }> = ({ formData, setFormData, activateAForm }) => {
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({
        phoneNumber: false,
        username: false,
        password: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Reset all input errors to false at every submit
        setFormErrors({
            phoneNumber: false,
            username: false,
            password: false
        });

        // Check if required fields are empty
        let updatedErrors = {};
        if (formData.phoneNumber.trim().length < 5) {
            updatedErrors = {
                ...updatedErrors,
                phoneNumber: true
            };
        }
        if (formData.username.trim().length < 3) {
            updatedErrors = {
                ...updatedErrors,
                username: true
            };
        }
        if (formData.password.trim().length < 4) {
            updatedErrors = {
                ...updatedErrors,
                password: true
            };
        }

        // If there are empty fields or other types of errors, stop the function
        // It will warn the user with red input borders automatically
        if (Object.keys(updatedErrors).length > 0) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                ...updatedErrors
            }));
            return;
        }

        const payload_preRegister = {
            phoneNumber: refactorPhoneNumber(formData.countryCode, formData.phoneNumber),
            username: formData.username.trim(),
            email: formData.emailPrefix.trim() != "" ? formData.emailPrefix.trim() + formData.emailDomain : null
        };

        await fetch('https://localhost:7165/api/pre-register', {
            method: 'POST',
            headers: defaultFetchHeaders,
            body: strPayload(payload_preRegister)
        })
            .then((res) => {
                if (res.status === 409) {
                    throw new Error('The username, phone number or email is already in use');
                } else if (res.status === 429) {
                    throw new Error('Too many activation code requests');
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
                activateAForm();
            }).catch(handleError);

        async function asdf() {
            const payload_register = {
                phoneNumber: refactorPhoneNumber(formData.countryCode, formData.phoneNumber),
                username: formData.username.trim(),
                password: formData.password,
                email: formData.emailPrefix.trim() + formData.emailDomain,
                fullname: formData.fullName.trim() != "" ? formData.fullName.trim() : null,
                activationCode: null
            };
            await fetch('https://localhost:7165/api/register', {
                method: 'POST',
                headers: defaultFetchHeaders,
                body: strPayload(payload_register)
            })
                .then((res) => {
                    if (res.status === 409) {
                        throw new Error('The username, phone number or email is already in use');
                    } else if (res.status === 400) {
                        throw new Error('Activation code is incorrect');
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
                        countryCode: '90',
                        username: '',
                        password: '',
                        emailPrefix: '',
                        emailDomain: '@gmail.com',
                        fullName: ''
                    });
                    navigate("/");
                }).catch(handleError);
        }

    };

    return (
        <form className='register_form' onSubmit={handleSubmit}>
            <div className='re-user_info'>
                <span>Numara</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <PhoneNumberInput phoneNumber={formData.phoneNumber} setFormData={setFormData} phoneNumberError={formErrors.phoneNumber} />
                    </div>
                    <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                        <option value='90'>TR (+90)</option>
                        <option value='1'>USA (+1)</option>
                        <option value='49'>DE (+49)</option>
                        <option value='7'>RU (+7)</option>
                    </select>
                </div>
                <span>Kullanıcı Adı</span>
                <div className='re-row'>
                    <div className='re-input-cont'>
                        <input
                            type='text'
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='Örn; kemalsunal345'
                            className={`${formErrors.username ? 'input_error' : ''}`}
                        />
                    </div>
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
                <span>E-Posta<span>(İsteğe bağlı)</span><span className='re-input-warning'>Şifre yenileme için gerekli.</span></span>
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

const SmsActivationForm: React.FC<{ formData: any, activateRForm: () => void }> = ({ formData, activateRForm }) => {
    function formDataLog() {
        console.log(formData);
    }
    return (
        <form>
            <button type='button' onClick={formDataLog}>Log form data</button>
        </form>
    );
}


export const Page_Register = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        countryCode: '90',
        username: '',
        password: '',
        emailPrefix: '',
        emailDomain: '@gmail.com',
        fullName: ''
    });

    // Form switchers
    const [rForm, setRForm] = useState(true);
    const [aForm, setAForm] = useState(false);
    const activateRForm = () => {
        setRForm(true);
        setAForm(false);
    };
    const activateAForm = () => {
        setRForm(false);
        setAForm(true);
    };

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Kayıt Ol" />
                <main className='main-register'>
                    {rForm && <RegistrationForm formData={formData} setFormData={setFormData} activateAForm={activateAForm} />}
                    {aForm && <SmsActivationForm formData={formData} activateRForm={activateRForm} />}
                </main>
            </section>
        </div>
    )
};
