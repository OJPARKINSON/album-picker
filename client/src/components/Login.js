import React, { useEffect, useState} from 'react'
import axios from 'axios'
// import {
//     // BrowserRouter as Router,
//     // Switch,
//     // Route,
//     Link
//   } from "react-router-dom";

const Login = () => {
    const [link, setLink] = useState("");
    useEffect(() => {
        axios({
            method: 'GET',
            url: '/auth/spotify',
        })
        .then(reslink => setLink(reslink.data))
        .catch((err) => console.log(err));
    })
    return (
        <>
            <h1>Welcome to Album Picker</h1>
            <ul>
                <li>
                    <a href={link}>Login</a>
                </li>
            </ul>
        </>
    )
}

export default Login