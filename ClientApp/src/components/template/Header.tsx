import React, { useState, useRef, useEffect } from 'react';
import { Search, List, PersonCircle, CaretDownFill, Gear, Shuffle, Newspaper, ArrowLeftShort } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';



const Drawer = (props: {
    drawerActive: boolean,
    toggleDrawer: () => void,
    closeDrawer: () => void,
}) => {
    const refDrawer = useRef<any>(null);

    const handleClickOutsideDrawer = (event: any) => {
        if (refDrawer.current && !refDrawer.current.contains(event.target)) {
            props.closeDrawer();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDrawer);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDrawer);
        };
    }, []);

    return (
        <div className={`drawer-cont${props.drawerActive ? ' active' : ''}`} id='mobile_drawer'>
            <nav className='drawer' ref={refDrawer}>
                <div className='dr-account-cont'>
                    <div className='dr-closeDrawer' onClick={props.toggleDrawer}>
                        <ArrowLeftShort />
                    </div>
                    <div className='dr-profilePic-cont'>
                        <img src={require('../../assets/images/SiteIcon.png')} alt="MarkaSkor Icon" />
                    </div>
                    <div className='dr-account_info'>
                        <span className='dr-account_username'>Muhammedİrşat</span>
                        <span className='dr-account_email'>irsat000@gmail.com</span>
                    </div>
                </div>
                <div className='dr-link_groups-cont'>
                    <span className='dr-group_heading'>Account</span>
                    <ul className='dr-group_account'>
                        <li><a href='/'><PersonCircle className='dr-link_icon' /><span>Giriş yap</span></a></li>
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


const DesktopHeader = (props: {
    page: String
}) => {
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    const refDropdownMenu = useRef<any>(null);
    const refMenuBtn = useRef<any>(null);

    const toggleDropdownMenu = () => {
        setDropdownMenuActive(!dropdownMenuActive);
    };

    const handleClickOutsideDM = (event: any) => {
        if (refDropdownMenu.current && !refDropdownMenu.current.contains(event.target)
            && refMenuBtn.current && !refMenuBtn.current.contains(event.target)) {
            setDropdownMenuActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDM);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDM);
        };
    }, []);

    return (
        <div className='desktop_header'>
            <div className='page_title'>
                <span>{props.page}</span>
            </div>
            <div className='header_actions'>
                {props.page !== 'Anasayfa' ?
                    <div className='search-header_desktop-cont'>
                        <input type='text' placeholder='Marka ara' />
                        <Search className='search_input-icon' />
                    </div> : null
                }
                <div ref={refMenuBtn} className='menu-cont' onClick={toggleDropdownMenu}>
                    <div className='account'>
                        <PersonCircle />
                    </div>
                    <div className='dropdown_menu-btn'>
                        <CaretDownFill />
                    </div>
                </div>
                <ul ref={refDropdownMenu} className={`dropdown_menu${dropdownMenuActive ? ' active' : ''}`}>
                    <li>
                        <a>
                            <div className='dm_icon-cont'><PersonCircle /></div>
                            <span>Giriş yap</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/kaydol'>
                            <div className='dm_icon-cont'><PersonCircle /></div>
                            <span>Kayıt ol</span>
                        </Link>
                    </li>
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


export const AppHeader = (props: {
    page: String
}) => {
    const [drawerActive, setDrawerActive] = useState(false);

    const toggleDrawer = () => {
        setDrawerActive(!drawerActive);
    };
    const closeDrawer = () => {
        setDrawerActive(false);
    }

    return (
        <header className='app_header'>
            <div className='mobile_header'>
                <div className='drawerBtn-cont' onClick={toggleDrawer}>
                    <List />
                </div>
                {props.page !== 'Anasayfa' ?
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
            <DesktopHeader page={props.page} />
            <Drawer drawerActive={drawerActive} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} />
        </header>
    )
};