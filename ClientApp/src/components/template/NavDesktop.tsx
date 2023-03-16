import React from 'react';
import { Shuffle, Newspaper } from 'react-bootstrap-icons';

export const NavDesktop = () => {
    return (
        <nav className='desktop_nav'>
            <a href='/' className='nav_logo-cont'>
                <img src={require('../../assets/images/SiteIcon.png')} alt="MarkaSkor Icon" />
                <span>MarkaSkor</span>
            </a>
            <ul className='nav_useful_links'>
                <li>
                    <div className='nav_link_icon-cont'><Shuffle /></div>
                    <span>Marka kıyasla</span>
                </li>
                <li>
                    <div className='nav_link_icon-cont'><Newspaper /></div>
                    <span>Haberler</span>
                </li>
            </ul>
        </nav>
    )
};