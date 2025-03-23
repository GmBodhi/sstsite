import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function TopNavBarComponent() {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    return (
            <motion.nav
                className="fixed top-0 left-0 right-0 w-full flex justify-between items-center py-2 px-5 bg-black/40 backdrop-blur-md border-b border-white/10 z-50"
                initial={{ opacity: 0, transform: 'translateY(-20px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ ease: 'linear', duration: 0.6 }}
            >
                <div className="flex items-center space-x-4">
                    <Image
                        alt="Student Union"
                        width={50}
                        height={50}
                        src="https://i.ibb.co/PMDzyY1/student-union.png"
                        className="brightness-0 invert drop-shadow-md"
                        priority
                    />
                    <div className="h-10 w-px bg-white/25"></div>
                    <Image
                        alt="SCTCE Logo"
                        height={60}
                        width={60}
                        src="/sst.png"
                        className="brightness-0 invert object-cover drop-shadow-md"
                        priority
                    />
                </div>

                {/* Auth buttons */}
                <div className="flex items-center space-x-3">
                     {!isAuthenticated && pathname !== '/login' && (
                        <Link href="/login">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </motion.nav>
    );
}
