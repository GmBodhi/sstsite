'use client'
import BlogCardComponent from '@/components/BlogCardComponent';
import Head from 'next/head';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect} from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function All() {
    const [option, setOption] = useState('all');
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    
    // Redirect to login page if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?returnUrl=' + encodeURIComponent('/e/all'));
        }
    }, [isAuthenticated, isLoading, router]);
    
    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-white">Loading...</p>
            </div>
        );
    }
    
    // Don't render the actual page content if not authenticated
    if (!isAuthenticated) {
        return null; // This prevents the page content from flashing before redirect
    }

    return (
        <div>
            <BottomNavBarComponent />
            <div className="blogContainer mb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-0">
                        Events
                    </h1>
                </div>
                
                <div className="backdrop-blur-sm rounded-lg mt-4 mx-4 p-4">
                    <Tabs defaultValue="all" className="dark">
                        <TabsList className="grid w-full grid-cols-5 mb-6">
                            {["all","music","instruments","dance","literary"].map((programTypes,index)=>{
                                return(
                                    <TabsTrigger key={index} value={programTypes} onClick={() => setOption(programTypes)}>
                                        {programTypes}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        
                        <TabsContent value={option}>
                            <BlogCardComponent option={option} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
