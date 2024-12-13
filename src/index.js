import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./App/Home";
import Business from './Cashbook/Business';
import BusinessPage from './Cashbook/BusinessPage';
import Login from './Zerodha/Login';
import Pnl from './Zerodha/Pnl';
import './Zerodha/Zerodha.css';
import './App.css';
import './index.css';
import UserRegistration from './userregistration/Userregistration';

// const store = createStore(RootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <HashRouter>
      <Routes>
        <Route path="/" element={<Business/>}/>
        <Route path="/BusinessPage/:id" element={<BusinessPage/>}/>
      </Routes>
    </HashRouter> */}
  {/* <Business/> */}

  <HashRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Pnl" element={<App/>}/>
        <Route path="/register" element={<UserRegistration/>}/>
        {/* Add other routes here if needed */}
      </Routes>
    </HashRouter>
  {/* <UserRegistration/> */}
    {/* <App/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
