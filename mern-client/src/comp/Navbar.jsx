import React, { useContext, useEffect, useState } from 'react'
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from '../contents/AuthProvider';
import logo from '../assets/liburi-high-resolution-logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const {user} = useContext(AuthContext);
    console.log(user);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const navItems = [
        {link: "Home", path: "/"},
        //{link: "About", path: "/about"},
        {link: "All Books", path: "/AllBooks"},
        {link: "All Movies", path: "/AllMovies"},
        {link: "All Animanga", path: "/AllAnimanga"},
        {link: "Profile", path: "/admin/dashboard"},
        
        
    ]
  return (
    <header className='w-full bg-tan fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-tan": ""}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                {/* */}
                <a href="/" className="text-2x1 font-bold text-blue-700 flex items-center gap-2">
                    <img className='h-16 w-30 rounded-lg' src={logo} alt="logo"/>
                    </a>

                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link, path}) => <a href={path} className='block text-base text-black uppercase cursor-pointer
                        hover:text-blue-700'>{link}</a>)
                    }
                </ul>

                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
                    {
                        user? user.email : ""
                    }
                </div>

                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen? <FaXmark className='h-5 w-5 text-black'/>: <FaBarsStaggered className='h-5 w-5 text-black'/>
                        }
                    </button>

                </div>
            </div>

            <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700  ${isMenuOpen ? "block fixed top-0 right-0 left-0": 'hidden'}`}>
                {
                     navItems.map(({link, path}) => <a href={path} className='block text-base text-white uppercase cursor-pointer
                     '>{link}</a>)
                 
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar
