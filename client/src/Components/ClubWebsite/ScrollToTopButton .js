import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import { ArrowUpOutlined } from '@ant-design/icons';

const ScrollToTopButton = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        calculateScrollValue();
        window.addEventListener('scroll', calculateScrollValue);
        return () => {
            window.removeEventListener('scroll', calculateScrollValue);
        };
    }, []);
    const calculateScrollValue = () => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / windowHeight) * 100;
        setScrollProgress(progress);
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
        console.log("windowHeight:", progress);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div id="progress" style={{
                display: scrollProgress > 0 ? 'grid' : 'none',
            }} onClick={scrollToTop}>
                <span id="progress-value"><ArrowUpOutlined /></span>
            </div>
        </>
    );
};

export default ScrollToTopButton;
