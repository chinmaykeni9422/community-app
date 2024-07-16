import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from "./components/FirstPage.jsx"
import ReferenceNumber from "./components/ReferenceNumber.jsx"
import UserMobileNumber from "./components/UserMobileNumber.jsx"
import OTOEntry from "./components/OTPEntry.jsx"
import LoginPage from "./components/LoginPage.jsx"
import WelcomePage from "./components/WelcomePage.jsx"
import Layout from "./Layout.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<FirstPage />} />
            <Route path="refNumPage" element={<ReferenceNumber />} />
            <Route path="userNumPage" element={<UserMobileNumber />} />
            <Route path="otpPage" element={<OTOEntry />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="welcome" element={<WelcomePage />} />
          </Route>
        </Routes>
    </Router>
  </React.StrictMode>,
)
