import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, List, CaretDownFill, Gear, BoxArrowRight, Person, PersonCheck, PersonAdd } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Drawer } from './Drawer';
import { LoginModal } from './LoginModal';
import { UserContext } from '../../context/AuthContext';
import { logoutUser } from '../../utility/authUtils';




const DesktopHeader: React.FC<{
    page: String,
    toggleLoginModal: () => void,
    dropdownMenuActive: boolean,
    setDropdownMenuActive: (e: any) => void
}> = ({ page, toggleLoginModal, dropdownMenuActive, setDropdownMenuActive }) => {
    const { userData, setUserData } = useContext(UserContext);
    // To check where the click even happened so we can on/off the dropdown menu
    const refDropdownMenu = useRef<any>(null);
    const refMenuBtn = useRef<any>(null);

    // Clicking on dropdown menu button toggles the menu
    const toggleDropdownMenu = () => {
        setDropdownMenuActive(!dropdownMenuActive);
    };

    // Clicking anywhere else than the menu or the menu toggle button closes the dropdown menu
    const handleClickOutsideDM = (event: any) => {
        if (refDropdownMenu.current && !refDropdownMenu.current.contains(event.target)
            && refMenuBtn.current && !refMenuBtn.current.contains(event.target)) {
            setDropdownMenuActive(false);
        }
    };

    // Required for registering all click event
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDM);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDM);
        };
    }, []);

    return (
        <div className='desktop_header'>
            <div className='page_title'>
                <span>{page}</span>
            </div>
            <div className='header_actions'>
                {page !== 'Anasayfa' ?
                    <div className='search-header_desktop-cont'>
                        <input type='text' placeholder='Marka ara' />
                        <Search className='search_input-icon' />
                    </div> : null
                }
                <div ref={refMenuBtn} className='menu-cont' onClick={toggleDropdownMenu}>
                    <div className='account'>
                        {userData != null ? <PersonCheck /> : <Person />}
                    </div>
                    <div className='dropdown_menu-btn'>
                        <CaretDownFill />
                    </div>
                </div>
                <ul ref={refDropdownMenu} className={`dropdown_menu ${dropdownMenuActive ? 'active' : ''}`}>
                    {userData != null ? <>
                        <li>
                            <Link to='/profil'>
                                <div className='dm_icon-cont'><Person /></div>
                                <span>{userData.full_name ?? userData.unique_name}</span>
                            </Link>
                        </li>
                        <li>
                            <a onClick={() => logoutUser(setUserData)}>
                                <div className='dm_icon-cont'><BoxArrowRight /></div>
                                <span>Çıkış yap</span>
                            </a>
                        </li>
                    </> : <>
                        <li>
                            <a onClick={toggleLoginModal}>
                                <div className='dm_icon-cont'><Person /></div>
                                <span>Giriş yap</span>
                            </a>
                        </li>
                        <li>
                            <Link to='/kaydol'>
                                <div className='dm_icon-cont'><PersonAdd /></div>
                                <span>Kayıt ol</span>
                            </Link>
                        </li>
                    </>}
                    <li>
                        <Link to='/ayarlar'>
                            <div className='dm_icon-cont'><Gear /></div>
                            <span>Ayarlar</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export const AppHeader: React.FC<{
    page: String
}> = ({ page }) => {
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    const [drawerActive, setDrawerActive] = useState(false);
    const [loginModalActive, setLoginModalActive] = useState(false);

    const toggleDrawer = () => {
        setDrawerActive(!drawerActive);
    };

    const toggleLoginModal = () => {
        setLoginModalActive(!loginModalActive);
        setDropdownMenuActive(false);
        setDrawerActive(false);
    };

    return (
        <header className='app_header'>
            <div className='mobile_header'>
                <div className='drawerBtn-cont' onClick={toggleDrawer}>
                    <List />
                </div>
                {page !== 'Anasayfa' ?
                    <>
                        <div className='logo-mobile-cont'>
                            <span>MarkaSkor</span>
                        </div>
                        <div className='search-mobile-cont'>
                            <Search />
                        </div>
                    </> : null
                }
            </div>
            <DesktopHeader page={page} toggleLoginModal={toggleLoginModal} dropdownMenuActive={dropdownMenuActive} setDropdownMenuActive={setDropdownMenuActive} />
            <Drawer drawerActive={drawerActive} toggleDrawer={toggleDrawer} toggleLoginModal={toggleLoginModal} />
            <LoginModal modalActive={loginModalActive} toggleLoginModal={toggleLoginModal} />
        </header>
    )
};