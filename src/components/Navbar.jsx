import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
        setButton(false);
        } else {
        setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                <Link to='/badgetest-gh-pages/' className='navbar-logo' onClick={closeMobileMenu}>
                    4500&nbsp;&nbsp;
                    <i className='fa-solid fa-robot' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                    <Link to='/badgetest-gh-pages/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                    </li>

                    <li>
                    <Link
                        to='/badgetest-gh-pages/profile'
                        className='nav-links-mobile'
                        onClick={closeMobileMenu}
                    >
                        Profile
                    </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>PROFILE</Button>}
                </div>
            </nav>
        </>
    );
    }

    export default Navbar;