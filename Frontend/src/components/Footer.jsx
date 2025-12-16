import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark">
            <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700 sm:flex-row">
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">© 2024 Quick Serve. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a className="text-sm text-text-muted-light transition-colors hover:text-primary dark:text-text-muted-dark dark:hover:text-primary" href="#">Terms</a>
                        <a className="text-sm text-text-muted-light transition-colors hover:text-primary dark:text-text-muted-dark dark:hover:text-primary" href="#">Privacy</a>
                        <a className="text-sm text-text-muted-light transition-colors hover:text-primary dark:text-text-muted-dark dark:hover:text-primary" href="#">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
