import './App.css';
import React from "react";
import {Link} from "react-router-dom";

export default function App() {
        return (
            <div className="App">
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/signup">Signup</Link></button>
                <button><Link to="/">Landing</Link></button>
                <button><Link to="/weighthistory">WeightHistory</Link></button>
            </div>
        );
}

