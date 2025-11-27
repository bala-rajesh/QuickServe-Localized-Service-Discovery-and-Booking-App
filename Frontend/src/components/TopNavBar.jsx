import React from 'react';
import NotificationsIcon from './icons/NotificationsIcon';

const TopNavBar = ({ title }) => {
    return (
        <header className="flex h-16 items-center justify-between whitespace-nowrap border-b border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark px-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark gap-2 text-sm font-bold">
                <NotificationsIcon />
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"></span>
            </button>
        </header>
    );
};

export default TopNavBar;
