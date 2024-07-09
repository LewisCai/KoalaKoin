import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import LogoL from '../../assets/images/bluelogo.png';
import LoginButton from '../LoginButton'; // Adjust the import path according to your project structure

const Topbar = () => (
    <div className='nav-bar'>
        <div className='left'>
            <NavLink exact="true" activeclassname='active' className="nav-link" to='/course'>
                Courses
            </NavLink>
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search" className="search-input" />
            </div>
        </div>
        <div className='center'>
            <Link className='logo' to='/'>
                <img src={LogoL} alt="logo"/>
            </Link>
            <div className='brand-name'>Koala Koin</div>
        </div>
        <div className='right'>
            <LoginButton />  {/* Use the LoginButton here */}
            <NavLink exact="true" activeclassname='active' className="nav-link signup" to='/signup'>
                Sign up
            </NavLink>
        </div>
    </div>
);

export default Topbar;
