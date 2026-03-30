"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import HeaderAuth from './HeaderAuth';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='header'>
            <nav className="nav">
                <div className="logo">
                    <Link href="/">Simple Todo</Link>
                </div>

                <button 
                    className="hamburger" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <HeaderAuth />
                </div>
            </nav>
        </header>
    )
}

export default Header;