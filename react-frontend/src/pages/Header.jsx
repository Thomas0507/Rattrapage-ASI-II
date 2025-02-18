import { Outlet, Link } from 'react-router-dom';
import React from 'react'

const Header = () => {
    return (
        <>
           <Link to="/">Home</Link>
           <Outlet/>
        </>
    )
};

export default Header;