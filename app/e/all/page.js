'use client'
import BlogCardComponent from '@/components/BlogCardComponent';
import Head from 'next/head';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginComponent from '@/components/LoginComponent';
import { useState, useEffect} from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Search } from 'lucide-react';

export default function All() {
    const [option, setOption] = useState('all');
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <div>
            <BottomNavBarComponent />
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-xl text-white">Loading...</p>
                </div>
            ) : !isAuthenticated ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}>Events</h1>
                    <p className="text-white mb-[10px]">Login to view the events</p>
                    <LoginComponent />
                </div>
            ) : (
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
            )}
        </div>
    );
}
