import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/dmovie.png';

// Define the type for the navigation items
interface HeaderNavItem {
  display: string;
  path: string;
}

const headerNav: HeaderNavItem[] = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement | null>(null); 

  // Find the active navigation item
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        if (headerRef.current) {
          headerRef.current.classList.add('shrink');
        }
      } else {
        if (headerRef.current) {
          headerRef.current.classList.remove('shrink');
        }
      }
    };

    window.addEventListener('scroll', shrinkHeader);

    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="tMovies Logo" />
          <Link to="/">D Movies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={i === active ? 'active' : ''}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
