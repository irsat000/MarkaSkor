import React, { useState, useRef, useEffect } from 'react';
import { Search, List, PersonCircle, CaretDownFill, Gear } from 'react-bootstrap-icons';



const Drawer = (props: {
    isActive: boolean,
    toggleDrawer: () => void
}) => {
    return (
        <div className={`drawer-cont${props.isActive ? ' active' : ''}`} id='mobile_drawer' onClick={props.toggleDrawer}>
            <nav className='drawer'>

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
                <span>Anasayfa</span>
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
                        <div className='dm_icon-cont'><PersonCircle /></div>
                        <span>Giriş yap</span>
                    </li>
                    <li>
                        <div className='dm_icon-cont'><PersonCircle /></div>
                        <span>Kayıt ol</span>
                    </li>
                    <li>
                        <div className='dm_icon-cont'><Gear /></div>
                        <span>Ayarlar</span>
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
            <Drawer isActive={drawerActive} toggleDrawer={toggleDrawer} />
        </header>
    )
};