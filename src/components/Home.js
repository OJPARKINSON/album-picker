import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Welcome to Album Picker</h1>
            <Link to="/Login">Login</Link>
        </>
    )
}

export default Home