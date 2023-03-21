import React from 'react';
import { Link } from 'react-router-dom';
import { Shuffle, Newspaper, Gear } from 'react-bootstrap-icons';

export const NavDesktop = () => {
    return (
        <nav className='desktop_nav'>
            <Link to="/" className='nav_logo-cont'>
                <img src={require('../../assets/images/SiteIcon.png')} alt="MarkaSkor Icon" />
                <span>MarkaSkor</span>
            </Link>
            <ul className='nav_useful_links'>
                <li>
                    <div className='nav_link_icon-cont'><Shuffle /></div>
                    <span>Marka kıyasla</span>
                </li>
                <li>
                    <div className='nav_link_icon-cont'><Newspaper /></div>
                    <span>Haberler</span>
                </li>
                <li>
                    <div className='nav_link_icon-cont'><Gear /></div>
                    <span>Ayarlar</span>
                </li>
            </ul>
        </nav>
    )
};