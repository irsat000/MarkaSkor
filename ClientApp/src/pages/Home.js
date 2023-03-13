import { } from 'react-bootstrap-icons';
import { IndexHeader, AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';

export const HomePage = () => {
    return (
        <div className='page_content'>
            <NavDesktop />
            <aside>
                <AppHeader />
                <main>
                    Hi!
                </main>
            </aside>
        </div>
    )
};