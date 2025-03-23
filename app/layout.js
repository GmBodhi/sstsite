'use client'
import './globals.css'
import DesktopNotice from '@/components/DesktopNotice'
import { useAuth } from '@/lib/hooks/useAuth'
import { Toaster } from '@/components/ui/sonner'
import BottomNavBarComponent from '@/components/BottomNavBarComponent'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) { 
    const { isLoading } = useAuth();
    const pathname = usePathname();
    
    // Check if the current route is in the login section
    const isLoginRoute = pathname.startsWith('/login');
    
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="theme-color" content="#000000" />
                <title>സർഗ്ഗം ചിത്രം താളം</title>
                <meta property="og:title" content="സർഗ്ഗം ചിത്രം താളം" />
                <meta property="og:image" content="https://i.ibb.co/bmM9VqK/sst-side-pic.jpg" />
                <meta property="og:description" content="സർഗ്ഗം ചിത്രം താളം" />
            </head>
            <body className="bg-black text-white min-h-screen">
                {/* Desktop/Landscape Notice Overlay component */}
                <DesktopNotice />
                <Toaster />
                {/* Main Content */}
                <div className="">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-screen">
                            <img src="/sst.png" alt="logo" className="w-[150px] h-[182px] mx-auto" />
                        </div>
                    ) : (
                        children
                    )}
                </div>
                
                {/* Only show bottom navigation on non-login routes */}
                {!isLoginRoute && <BottomNavBarComponent />}
            </body>
        </html>
    )
}   