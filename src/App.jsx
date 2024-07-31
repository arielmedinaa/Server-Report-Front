import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast"
import AuthPage from "./pages/AuthPage"
import ReportPage from "./pages/ReportPages"
import ConfigPage from "./pages/ConfigPage"
import ChatPage from "./pages/ChatPage"
import UnknowPage from "./pages/UnknowPage"

function App() {
  return (
    <BrowserRouter>
    <Toaster 
        position="top-right"
      />
      <Routes>
        <Route path="/auth/" element={<AuthPage />} />
        <Route path="/home/:ruc" element={<ReportPage />} />
        <Route path="/configuraciones/:ruc" element={<ConfigPage />} />
        <Route path="/chat/:ruc" element={<ChatPage />} />
        {/* <Route path="/404/:ruc" element={<UnknowPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App