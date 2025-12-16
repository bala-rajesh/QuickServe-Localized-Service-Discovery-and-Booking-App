import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-700/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-4">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                    </svg>
                    <h2 className="text-xl font-bold tracking-tight">Quick Serve</h2>
                </Link>
                <nav className="hidden items-center gap-8 md:flex">
                    <a className="text-sm font-medium transition-colors hover:text-primary" href="#features">Features</a>
                    <a className="text-sm font-medium transition-colors hover:text-primary" href="#how-it-works">How it Works</a>
                    <a className="text-sm font-medium transition-colors hover:text-primary" href="#pricing">Pricing</a>
                </nav>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm font-medium text-text-muted-light dark:text-text-muted-dark sm:block">
                            {user.email}
                        </span>
                        <button
                            onClick={logout}
                            className="flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-surface-light px-4 text-sm font-bold leading-normal tracking-wide transition-colors hover:bg-gray-200 dark:bg-surface-dark dark:hover:bg-gray-700"
                        >
                            <span className="truncate">Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/provider/login" className="relative overflow-hidden rounded-md px-4 py-2 text-sm font-bold text-text-muted-light transition-all hover:text-primary dark:text-text-muted-dark hover:bg-primary/10 active:scale-95">
                            Provider Login
                        </Link>
                        <Link to="/seeker/login" className="relative overflow-hidden rounded-md bg-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95">
                            Seeker Login
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
