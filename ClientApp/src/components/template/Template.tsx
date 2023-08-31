import React from 'react';
import { AppHeader } from './Header';
import { NavDesktop } from './NavDesktop';



const Template: React.FC<{
    children: any,
    pageName: string
}> = ({ children, pageName }) => {
    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader pageName={pageName} />
                {children}
            </section>
        </div>
    )
};

export default Template;