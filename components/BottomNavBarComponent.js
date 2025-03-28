import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, StarIcon, Ticket, User } from 'lucide-react';

export default function BottomNavBarComponent() {
    const pathname = usePathname();

    // Active route styling helper
    const isActive = (path) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname === path) return true;
        if (path === '/e/all' && pathname === '/e/all') return true;
        if (path === '/profile' && pathname === '/profile') return true;
        return false;
    };

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 w-full flex justify-center py-3 px-4 mb-1 mx-auto z-50"
        >
            <div className="w-full max-w-screen-lg flex justify-around items-center px-4 py-3 bg-black/30 backdrop-blur-md border-t border-white/10 z-50 rounded-3xl">
                <Link 
                    href="/" 
                    className={`text-3xl px-4 py-2 transition-all duration-300 flex items-center justify-center ${
                        isActive('/') 
                            ? 'text-white -translate-y-[1px] font-semibold' 
                            : 'text-gray-400 hover:bg-white/10 hover:rounded-3xl'
                    }`}
                    aria-label="Home"
                    role="button"
                    tabIndex={0}
                >
                    <Home className="h-6 w-6" />
                </Link>
                <Link 
                    href="/points" 
                    className={`text-3xl px-4 py-2 transition-all duration-300 ${
                        isActive('/points') 
                            ? 'text-white -translate-y-[1px] font-semibold' 
                            : 'text-gray-400 hover:bg-white/10 hover:rounded-3xl'
                    }`}
                >
                    <StarIcon className="h-6 w-6" />
                </Link>
                <Link 
                    href="/e/all" 
                    className={`text-3xl px-4 py-2 transition-all duration-300 flex items-center justify-center ${
                        isActive('/e/all') 
                            ? 'text-white -translate-y-[1px] font-semibold' 
                            : 'text-gray-400 hover:bg-white/10 hover:rounded-3xl'
                    }`}
                    aria-label="Events"
                    role="button"
                    tabIndex={0}
                >
                    <Ticket className="h-6 w-6" />
                </Link>
                <Link 
                    href="/profile" 
                    className={`text-3xl px-4 py-2 transition-all duration-300 flex items-center justify-center ${
                        isActive('/profile') 
                            ? 'text-white -translate-y-[1px] font-semibold' 
                            : 'text-gray-400 hover:bg-white/10 hover:rounded-3xl'
                    }`}
                    aria-label="Profile"
                    role="button"
                    tabIndex={0}
                >
                    <User className="h-6 w-6" />
                </Link>
            </div>
        </nav>
    );
}
