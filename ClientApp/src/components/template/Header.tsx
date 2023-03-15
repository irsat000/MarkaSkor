import React, { useState } from 'react';
import { Search, List, PersonCircle, CaretDownFill } from 'react-bootstrap-icons';



const Drawer = (props: { isActive: boolean, toggleDrawer: () => void }) => {
    return (
        <div className={`drawer-cont ${props.isActive ? 'active' : ''}`} id='mobile_drawer' onClick={props.toggleDrawer}>
            <nav className='drawer'>

            </nav>
        </div>
    )
};


const DesktopHeader = (props: any) => {
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
                <div className='menu-cont'>
                    <div className='account'>
                        <PersonCircle />
                    </div>
                    <div className='dropdown_menu-icon'>
                        <CaretDownFill />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const AppHeader = (props: any) => {
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