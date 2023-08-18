import React, { useRef, useEffect, useContext } from 'react';
import { PersonCircle, Gear, Shuffle, Newspaper, ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';

export const Drawer: React.FC<{
    drawerActive: boolean,
    toggleDrawer: () => void,
    toggleLoginModal: () => void
}> = ({ drawerActive, toggleDrawer, toggleLoginModal }) => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    // To check where the click even happened so we can on/off the drawer
    const refDrawer = useRef<any>(null);

    // Clicking the dark background closes the drawer with toggle function
    const handleClickOutsideDrawer = (event: any) => {
        if (refDrawer.current && !refDrawer.current.contains(event.target)) {
            toggleDrawer();
        }
    };

    return (
        <div className={`drawer-cont ${drawerActive ? 'active' : ''}`} id='mobile_drawer' onClick={handleClickOutsideDrawer}>
            <nav className='drawer' ref={refDrawer}>
                <div className='dr-account-cont'>
                    <div className='dr-closeDrawer' onClick={toggleDrawer}>
                        <ArrowLeftShort />
                    </div>
                    <div className='dr-pageicon-cont' onClick={() => navigate("/")}>
                        <img src={require('../../assets/images/SiteIcon.png')} alt="MarkaSkor Icon" />
                    </div>
                    <div className='dr-account_info'>
                        <span className='dr-account_username'>
                            {userData != null ? userData.fullname ?? userData.unique_name : ''}
                        </span>
                        <span className='dr-account_email'>
                            {userData != null ? userData.email : ''}
                        </span>
                    </div>
                </div>
                <div className='dr-link_groups-cont'>
                    <span className='dr-group_heading'>Hesap</span>
                    <ul className='dr-group_account'>
                        <li><a onClick={toggleLoginModal}><PersonCircle className='dr-link_icon' /><span>Giriş yap</span></a></li>
                        <li><Link to='/kaydol'><PersonCircle className='dr-link_icon' /><span>Kayıt ol</span></Link></li>
                    </ul>
                    <span className='dr-group_heading'>Genel</span>
                    <ul className='dr-group_general'>
                        <li><a href='/'><Shuffle className='dr-link_icon' /><span>Marka kıyasla</span></a></li>
                        <li><a href='/'><Newspaper className='dr-link_icon' /><span>Haberler</span></a></li>
                        <li><a href='/'><Gear className='dr-link_icon' /><span>Ayarlar</span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};