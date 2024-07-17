import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../../Client/src/Layout.jsx';
import App from './App.jsx'
import RefNum from './components/RefNum.jsx';
import Login from './components/Login.jsx';
import UserNum from './components/UserNum.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<App />} />
            <Route path="refNum" element={<RefNum />} />
            <Route path="Login" element={<Login />} />
            <Route path="userNum" element={<UserNum />} />
          </Route>
        </Routes>
    </Router>
  </React.StrictMode>,
)
