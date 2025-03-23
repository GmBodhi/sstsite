'use client'
import './globals.css'
import DesktopNotice from '@/components/DesktopNotice'
import { useAuth } from '@/lib/hooks/useAuth'
import { Toaster } from '@/components/ui/sonner'
export default function RootLayout({ children }) { 
    const { isLoading } = useAuth();
    
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body className="bg-black text-white min-h-screen">
                {/* Desktop/Landscape Notice Overlay component */}
                <DesktopNotice />
                <Toaster />
                {/* Main Content */}
                <div className="">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-screen">
                            <p className="text-xl">Loading...</p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </body>
        </html>
    )
}   