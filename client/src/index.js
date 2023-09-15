import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router, Routes ,Route } from 'react-router-dom';
import { Home } from './pages/home';
import './css/index.css';
//import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}  onEnter={document.title='labelWeb by TY'}/>
    </Routes>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
