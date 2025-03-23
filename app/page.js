'use client'
import TextMorpher from '@/components/MorphCompoment';
import { motion } from 'framer-motion';
import LoginComponent from '@/components/LoginComponent';
import Footer from '@/components/FooterComponent';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import TopNavBarComponent from '@/components/TopNavBarComponent';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function Home() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const sceneRef = useRef(null);
    
    // Initialize parallax effect
    useEffect(() => {
        // Only run on client side
        if (typeof window !== 'undefined') {
            const loadParallax = async () => {
                try {
                    // Check if Parallax is already defined
                    if (typeof window.Parallax === 'undefined') {
                        // Wait for the script to load
                        await new Promise((resolve) => {
                            if (document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"]')) {
                                resolve();
                            } else {
                                const checkScript = setInterval(() => {
                                    if (typeof window.Parallax !== 'undefined') {
                                        clearInterval(checkScript);
                                        resolve();
                                    }
                                }, 100);
                            }
                        });
                    }
                    
                    // Initialize parallax after confirming Parallax is available
                    if (sceneRef.current && typeof window.Parallax !== 'undefined') {
                        const parallaxInstance = new window.Parallax(sceneRef.current, {
                            relativeInput: true,
                            hoverOnly: false
                        });
                        
                        // Clean up on unmount
                        return () => parallaxInstance.destroy();
                    }
                } catch (error) {
                    console.error("Failed to initialize parallax:", error);
                }
            };
            
            loadParallax();
        }
    }, []);

    // Handle redirect to events page if logged in
    const handleRedirectToEvents = () => {
        if (isAuthenticated) {
            router.push('/e/all');
        }
    };

    return (
        <div className="min-h-screen flex flex-1 flex-col">
            
            <TopNavBarComponent />
            <div className="md:ml-[250px]">
                <div 
                    className="bg-black h-screen flex flex-col justify-center items-center relative overflow-hidden"
                >
                    {/* Background with parallax effect */}
                    <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: "url('https://i.ibb.co/bmM9VqK/sst-side-pic.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: "scale(1.1)", // Slightly larger to avoid edges during parallax
                            zIndex: 0,
                        }}
                        id="parallax-bg"
                        data-depth="0.1"
                    ></div>
                    
                    {/* Mask overlay */}
                    <div 
                        className="absolute inset-0 w-full h-full [mask-image:radial-gradient(89%_181%_at_56%_20%,#000_16%,transparent_115%)]"
                        style={{ zIndex: 1 }}
                    ></div>
                    
                    {/* Content with parallax effect */}
                    <div 
                        id="scene" 
                        ref={sceneRef}
                        className="relative w-full h-full flex flex-col justify-center items-center"
                        style={{ zIndex: 2 }}
                    >
                        <motion.div
                            data-depth="0.2"
                            className="m-[5px]"
                            initial={{ opacity: 0, transform: 'scaleY(0.98)' }}
                            whileInView={{ opacity: 1, transform: 'scaleY(1)' }}
                            transition={{ ease: 'easeIn', duration: 0.5 }}
                        >
                            <TextMorpher />
                        </motion.div>
                        {/* <motion.div
                            data-depth="0.6"
                            initial={{ opacity: 0, transform: 'translateY(50px)' }}
                            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                            transition={{ ease: 'linear', duration: 1.5 }}
                        >
                            <img
                                src="https://i.ibb.co/84bZG35/sst-24-label.png"
                                className="h-[200px] w-auto object-cover"
                                alt="SST 24 Label"
                            />
                        </motion.div> */}
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ ease: 'easeIn', duration: 1 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center mt-5">
                        <div className="bg-transparent text-white h-[60vh] w-full md:w-2/3 flex flex-col justify-center items-center rounded-[35px] md:ml-[90px]">
                            <h1 className="font-['TheGoodMonolith'] text-[45px] font-bold">This March</h1>
                            <div>
                                <div className="flex flex-row justify-center items-center m-[5px] w-full">
                                    <div className="ml-2">
                                        <h2 className="text-[56px] font-extrabold font-['Enhanced_LED_Board-7'] text-white break-words animate-BackgroundP">28</h2>
                                    </div>
                                    <div className="ml-2">
                                        <h2 className="text-[56px] font-extrabold font-['Enhanced_LED_Board-7'] text-white break-words animate-BackgroundP">29</h2>
                                    </div>
                                </div>
                            </div>
                            {isAuthenticated ? (
                                <div className="mt-4">
                                    <button
                                        onClick={handleRedirectToEvents}
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg h-14"
                                    >
                                        View Events
                                    </button>
                                </div>
                            ) : (
                                <LoginComponent />
                            )}
                        </div>
                    </div>
                </motion.div>
                <Footer />
            </div>
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"
                strategy="beforeInteractive"
            />
        </div>
    );
}
