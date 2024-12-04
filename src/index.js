import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../src/Redux/Services/Reducer/RootReducer';
import HeaderContainer from '../src/Redux/container/HeaderContainer';
import HomeContainer from '../src/Redux/container/HomeContainer';
=======
>>>>>>> a3a251a (Zerodha add)
import { BrowserRouter,HashRouter,Route,Routes} from "react-router-dom";
import Home from "./App/Home";
import Business from './Cashbook/Business';
import BusinessPage from './Cashbook/BusinessPage';
<<<<<<< HEAD
import Image from './Color/Image';
=======
import Login from './Zerodha/Login';
import Pnl from './Zerodha/Pnl';
>>>>>>> a3a251a (Zerodha add)

// const store = createStore(RootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Business/>
    <BusinessPage/> */}
  {/* <BrowserRouter>
    <Routes>
      <Route path="/" element={<Business/>}/>
      <Route path="/BusinessPage/:id" element={<BusinessPage/>}/>
    </Routes>
    </BrowserRouter> */}
    {/* <Image/> */}

<<<<<<< HEAD






    <App/>
=======
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Pnl" element={<App/>}/>
    </Routes>
    </BrowserRouter>

    {/* <App/> */}
>>>>>>> a3a251a (Zerodha add)
      {/* <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/App" element={<App/>}/>
        </Routes>
      </HashRouter> */}
{/* <Home/> */}
<<<<<<< HEAD
    {/* <Provider store={store}>
        <HeaderContainer/>
        <HomeContainer/>
    </Provider> */}
=======

>>>>>>> a3a251a (Zerodha add)

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
