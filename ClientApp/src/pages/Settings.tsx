import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';



export const Page_Settings = () => {

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Ayarlar" />
                <main className='main-settings'>
                    
                </main>
            </section>
        </div>
    )
};
