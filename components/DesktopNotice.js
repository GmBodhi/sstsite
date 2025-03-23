'use client'

import { useState, useEffect } from 'react'

export default function DesktopNotice() {
    const [showOverlay, setShowOverlay] = useState(false)
    const [isDesktopView, setIsDesktopView] = useState(true)
    const [mounted, setMounted] = useState(false)
    
    // Function to check if we should show the overlay
    const checkOrientation = () => {
        if (typeof window !== 'undefined') {
            // Get screen dimensions
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight
            const isLandscape = screenWidth > screenHeight
            
            // Detect if this is a desktop/tablet device based on screen size
            const isDesktop = screenWidth >= 1024
            
            // Detect if this is a mobile device in landscape orientation
            // We want to block any landscape orientation on devices that are likely
            // to be mobile phones (under 1024px wide when in landscape mode)
            const isLandscapeMobile = isLandscape && !isDesktop
            
            setIsDesktopView(isDesktop)
            setShowOverlay(isDesktop || isLandscapeMobile)
        }
    }
    
    useEffect(() => {
        // Mark component as mounted to avoid hydration issues
        setMounted(true)
        
        if (typeof window !== 'undefined') {
            checkOrientation()
            
            // Set up event listener for orientation/resize changes
            window.addEventListener('resize', checkOrientation)
            window.addEventListener('orientationchange', checkOrientation)
            
            // Clean up
            return () => {
                window.removeEventListener('resize', checkOrientation)
                window.removeEventListener('orientationchange', checkOrientation)
            }
        }
    }, [])
    
    // Don't render anything during SSR to avoid hydration issues
    if (!mounted) return null
    
    // If we don't need to show the overlay, don't render anything
    if (!showOverlay) return null
    
    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[100] flex flex-col justify-center items-center p-6 text-center">
            <div className="max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                
                {isDesktopView ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-white">Mobile Only Experience</h1>
                        <p className="text-xl mb-6 text-gray-300">
                            This site is designed exclusively for mobile devices. Please access it from your smartphone for the best experience.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-white">Please Rotate Your Device</h1>
                        <p className="text-xl mb-6 text-gray-300">
                            This application is designed to be used in portrait mode. Please rotate your device to continue.
                        </p>
                        <div className="mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
} 