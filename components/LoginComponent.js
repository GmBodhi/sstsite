import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { login } from '@/lib/actions/server';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginComponent({ returnUrl }) {
    const [isLogged, setIsLogged] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { setAuthToken, isAuthenticated } = useAuth();

    // Check if we're on the login page
    const isLoginPage = pathname === '/login';

    // Auto-open drawer if on login page and not already authenticated
    useEffect(() => {
        if (isLoginPage && !isAuthenticated && !isOpen) {
            setIsOpen(true);
        }
    }, [isLoginPage, isAuthenticated, isOpen]);

    // Check if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            setIsLogged(true);
        }
    }, [isAuthenticated]);

    const validateLogin = async () => {
        setLoading(true);
        try {
            const data = await login(username, password);
            
            if (data && data.token && data.token.token) {
                console.log(data.token);
                
                // Use auth hook to set token
                setAuthToken(data.token.token);
                
                // Show success toast
                toast.success("Successfully logged in!");
                
                // Close drawer if it's open
                setIsOpen(false);
                
                // Redirect to return URL or home
                if (returnUrl) {
                    router.push(decodeURIComponent(returnUrl));
                } else {
                    router.push('/');
                }
            } else {
                // Show error toast
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    // For login page, show a form directly instead of a drawer
    if (isLoginPage) {
        return (
            <div className="w-full space-y-4">
                <Input
                    className="dark p-6 rounded-lg bg-gray-800 border-gray-700"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Etlab username"
                />
                <Input
                    className="dark p-6 rounded-lg bg-gray-800 border-gray-700"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Etlab password"
                />
                <Button
                    className="h-12 w-full bg-red-600 hover:bg-red-700 text-white py-4 mt-4 font-medium transition-colors"
                    onClick={() => {
                        if (username !== '' && password !== '') validateLogin();
                    }}
                >
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </div>
        );
    }

    // For other pages, show the drawer
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg h-14">
                    Login with Etlab
                </Button>
            </DrawerTrigger>
            <DrawerContent className="dark">
                <div className="h-[600px] w-full max-w-md mx-auto">
                    <DrawerHeader className="border-b border-gray-800 pb-4">
                        <DrawerTitle className="text-2xl font-bold text-center">Login with Etlab</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col items-center px-8 py-6 text-white">
                        <div className="w-full space-y-4">
                            <Input
                                className="dark p-6 rounded-lg bg-gray-800 border-gray-700"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Etlab username"
                            />
                            <Input
                                className="dark p-6 rounded-lg bg-gray-800 border-gray-700"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Etlab password"
                            />
                            <Button
                                className="h-12 w-full bg-red-600 hover:bg-red-700 text-white py-4 mt-4 font-medium transition-colors"
                                onClick={() => {
                                    if (username !== '' && password !== '') validateLogin();
                                }}
                            >
                                {loading ? 'Loading...' : 'Login'}
                            </Button>
                        </div>
                        <div className="w-full mt-auto pt-4">
                            <Button
                                variant="outline"
                                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 py-4"
                                onClick={() => {
                                    window.open(
                                        `whatsapp://send?phone=8075496634&text=Hi, i cant verify my account : ${username} name : ${password}`,
                                    );
                                }}
                            >
                                Report Login Issue
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
