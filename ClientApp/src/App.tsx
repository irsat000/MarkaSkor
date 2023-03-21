import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page_Home } from './pages/Home';
import { Page_Discover } from './pages/Discover';
import { Page_Brand } from './pages/Brand';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page_Home />} />
      <Route path="/d/:sectorKey" element={<Page_Discover />} />
      <Route path="/b/:brandId" element={<Page_Brand />} />
    </Routes>
  )
}

export default App;