import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Page_Home } from './pages/Home';
import { Page_Discover } from './pages/Discover';
import { Page_Brand } from './pages/Brand';
import { Page_Register } from './pages/Register';
import { Page_Settings } from './pages/Settings';
import { checkUser, readUser } from './utility/authUtils';
import { UserContext } from './context/AuthContext';


const App = () => {
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    // Initialize user
    if (checkUser()) {
      // Decode user data from cookie jwt
      const readUserData = readUser() as any;
      // Set user data to UserContext for centralizing
      setUserData({
        unique_name: readUserData.unique_name,
        email: readUserData.email,
        full_name: readUserData.full_name
      });
    }
  }, []);

  return (
      <GoogleOAuthProvider clientId="1015441130118-081foo1ejjtmauar1op55938o2ud2c1q.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Page_Home />} />
          <Route path="/sektor/:sectorKey" element={<Page_Discover />} />
          <Route path="/marka/:brandId" element={<Page_Brand />} />
          <Route path="/kaydol" element={<Page_Register />} />
          <Route path="/ayarlar" element={<Page_Settings />} />
        </Routes>
      </GoogleOAuthProvider>
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