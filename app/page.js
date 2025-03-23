'use client'
import Head from 'next/head';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import TextMorpher from '@/components/MorphCompoment';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TopNavBarComponent from '@/components/TopNavBarComponent';
import LoginComponent from '@/components/LoginComponent';
import Footer from '@/components/FooterComponent';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Home() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Handle redirect to events page if logged in
    const handleRedirectToEvents = () => {
        if (isAuthenticated) {
            router.push('/e/all');
        }
    };

    return (
        <div className="min-h-screen flex flex-1 flex-col">
            <TopNavBarComponent />
            <BottomNavBarComponent />
            <Head>
                <title>സർഗം ചിത്രം താളം</title>
            </Head>
            
            <div className="md:ml-[250px]">
                <motion.div
                    className="bg-black h-screen flex flex-col justify-center items-center bg-[url('https://i.ibb.co/9HpTBFs/background-2.webp')] bg-no-repeat bg-cover bg-fixed w-full [mask-image:radial-gradient(89%_181%_at_56%_20%,#000_16%,transparent_115%)]"
                    initial={{ opacity: 0, transform: 'translateZ(-120px)' }}
                    whileInView={{ opacity: 1, transform: 'translateZ(0px)' }}
                    transition={{ ease: 'easeIn', duration: 2 }}
                >
                    <motion.div
                        className="m-[5px]"
                        initial={{ opacity: 0, transform: 'scaleY(0.98)' }}
                        whileInView={{ opacity: 1, transform: 'scaleY(1)' }}
                        transition={{ ease: 'easeIn', duration: 0 }}
                    >
                        <TextMorpher />
                    </motion.div>
                    <motion.img
                        src="https://i.ibb.co/84bZG35/sst-24-label.png"
                        className="h-[200px] w-auto object-cover"
                        initial={{ opacity: 0, transform: 'translateY(50px)' }}
                        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                        transition={{ ease: 'linear', duration: 2 }}
                    />
                </motion.div>
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
                        <div className="m-5 mr-[150px] mt-0 hidden md:block">
                            <Image
                                className="rounded-[35px]"
                                src="https://i.ibb.co/bmM9VqK/sst-side-pic.jpg"
                                width={550}
                                height={600}
                                alt="Theyyam"
                            />
                        </div>
                    </div>
                </motion.div>
                <Footer />
            </div>
        </div>
    );
}
