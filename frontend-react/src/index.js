import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./components/Landing";
import WeightHistory from "./components/WeightHistory/WeightHistory";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

        <React.StrictMode>

            <BrowserRouter>
                <App/>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/weighthistory" element={<WeightHistory />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
