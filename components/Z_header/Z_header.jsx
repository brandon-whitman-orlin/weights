import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Z_header.css';
import { ReactComponent as DropdownCaret } from '../../assets/icons/caret.svg';

const Z_header = ({ links, name = '', logo = '' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);

    const updateNavHeight = () => {
        requestAnimationFrame(() => {
            if (navbarRef.current) {
                const navHeight = navbarRef.current.offsetHeight;
                document.documentElement.style.setProperty('--navHeight', `${navHeight}px`);
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);

        updateNavHeight(); // Initial call on mount

        const observer = new ResizeObserver(() => {
            updateNavHeight();
        });

        if (navbarRef.current) {
            observer.observe(navbarRef.current);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const enhanceDropdown = (link, index) => {
        const originalClass = link.props.className || '';
        const hasDropdownClass = originalClass.includes('dropdown');

        const updatedClassName = hasDropdownClass
            ? originalClass
            : `${originalClass} dropdown`.trim();

        return (
            <div className="dropdown-wrapper" key={index}>
                {React.cloneElement(link, {
                    className: updatedClassName,
                    tabIndex: 0,
                })}
                <DropdownCaret className="dropdown-caret" aria-hidden="true" />
            </div>
        );
    };

    const updatedLinks = links.map((link, index) => {
        if (!React.isValidElement(link)) return link;

        const className = link.props.className || '';
        const isDirectDropdown = className.includes('dropdown');

        const updatedClassName = isDirectDropdown
            ? className
            : className.includes('nav-link')
                ? className
                : `${className} nav-link`.trim();

        const updatedLink = React.cloneElement(link, {
            className: updatedClassName,
            key: index,
        });

        return isDirectDropdown ? enhanceDropdown(link, index) : updatedLink;
    });

    return (
        <header className="header">
            <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                {name && (
                    <a href="/" rel="noopener noreferrer" className="site-name">
                        {logo}
                        <h2>{name}</h2>
                    </a>
                )}
                <ul className="nav-list">
                    {updatedLinks.map((link, index) => (
                        <li className="nav-item" key={index}>
                            {link}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="nav-spacer"></div>
        </header>
    );
};

Z_header.propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired,
    name: PropTypes.node,
    logo: PropTypes.node,
};

export default Z_header;
