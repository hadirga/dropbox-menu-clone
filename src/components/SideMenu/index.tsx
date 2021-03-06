import React, { useEffect, useState } from 'react'

import Styles from './styles.module.css';

const SCROLL_THRESHOLD = 300;

declare global {
    interface Window {
        toggleActiveMenu: (() => void) | undefined;
    }
}

const SideMenu: React.FC = ({children}) => {
    const [scrollY, setscrollY] = useState(0);
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        const onScroll = () => {
            setscrollY(window.scrollY);
            setIsActive(false);
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    const classes = [Styles.Container];
    classes.push(isActive ? Styles.Open : '');
    classes.push(scrollY <= SCROLL_THRESHOLD ? Styles.ScrollOpen : '');

    const className = classes.join(' ').trim();

    const toggleActiveMenu = () => {
        setIsActive(prev => !prev);
    }

    window.toggleActiveMenu = toggleActiveMenu;

    return <div className={className}>{children}</div>;
}

export default SideMenu;
