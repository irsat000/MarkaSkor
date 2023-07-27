import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';


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
                                    <input type='text' placeholder='Örn; (535) 615 48 95' />
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
                                    <input type='text' placeholder='Örn; gokhandenizli321' />
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
                                    <input type='text' placeholder='Örn; Gökhan Denizli' />
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
