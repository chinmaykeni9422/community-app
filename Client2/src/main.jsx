// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import App from './App.jsx';
import RefNum from './components/RefNum.jsx';
import Login from './components/Login.jsx';
import UserNum from './components/UserNum.jsx';
import OTPEntry from './components/OTPEntry.jsx';
import UserProfilePage from './components/UserProfilePage.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import AddNumber from './components/AddNumber.jsx';
import { UserProvider } from './Context/userContext.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<App />} />
            <Route path="refNum" element={<RefNum />} />
            <Route path="login" element={<Login />} />
            <Route path="userNum" element={<UserNum />} />
            <Route path="otp" element={<OTPEntry />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="home" element={<Home />} />
            <Route path="profilepage" element={<Profile />} />
            <Route path="addnumber" element={<AddNumber />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
