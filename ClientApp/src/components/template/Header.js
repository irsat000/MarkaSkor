import { Search, List, PersonCircle, CaretDownFill } from 'react-bootstrap-icons';


const DesktopHeader = () => {
    return (
        <div className="desktop_header">
            <div className="page_title">
                <span>Sektörler</span>
            </div>
            <div className='header_actions'>
                <div className="search-desktop-cont">
                    <input type="text" placeholder="Marka ara" />
                    <Search className='input_search-icon' />
                </div>
                <div className="menu-cont">
                    <div className="account">
                        <PersonCircle />
                    </div>
                    <div className="dropdown_menu-icon">
                        <CaretDownFill />
                    </div>
                </div>
            </div>
        </div>
    )
}




export const IndexHeader = () => {
    return (
        <header className="app_header">
            <div className="mobile_header-index">
                <div className="drawerBtn-cont">
                    <List />
                </div>
            </div>
            <DesktopHeader />
        </header>
    )
};

export const AppHeader = () => {
    return (
        <header className="app_header">
            <div className="mobile_header">
                <div className="drawerBtn-cont">
                    <List />
                </div>
                <div className="logo-mobile-cont">
                    <span>MarkaSkor</span>
                </div>
                <div className="search-mobile-cont">
                    <Search />
                </div>
            </div>
            <DesktopHeader />
        </header>
    )
};