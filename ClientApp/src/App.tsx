import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page_Home } from './pages/Home';
import { Page_Discover } from './pages/Discover';
import { Page_Brand } from './pages/Brand';
import { Page_Register } from './pages/Register';
import { Page_Settings } from './pages/Settings';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page_Home />} />
      <Route path="/sektor/:sectorKey" element={<Page_Discover />} />
      <Route path="/marka/:brandId" element={<Page_Brand />} />
      <Route path="/kaydol" element={<Page_Register />} />
      <Route path="/ayarlar" element={<Page_Settings />} />
    </Routes>
  )
}

export default App;









/*


export const Page_Register = () => {

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Kayıt Ol" />
                <main className='main-register'>
                    
                </main>
            </section>
        </div>
    )
};


*/