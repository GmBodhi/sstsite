'use client'
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Blog() {
    const router = useRouter();
    const params = useParams();
    const [teamId, setTeamId] = useState(null);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    
    const { isAuthenticated, isLoading, authFetch } = useAuth();

    useEffect(() => {
        // Get team ID from params
        if (params?.id) {
            setTeamId(params.id);
        }
    }, [params]);

    // Redirect to login page if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated && params?.id) {
            const returnUrl = `/e/${params.id}`;
            router.push('/login?returnUrl=' + encodeURIComponent(returnUrl));
        }
    }, [isAuthenticated, isLoading, router, params]);

    useEffect(() => {
        if (isAuthenticated && teamId) {
            const controller = new AbortController();
            getTeam(controller.signal);
            return () => {
                controller.abort();
            };
        }
    }, [isAuthenticated, teamId]);

    const getTeam = async (signal) => {
        setLoading(true);
        try {
            const response = await authFetch(
                `https://sstapi.pythonanywhere.com/api/team/members/${teamId}`,
                { signal }
            );
            const result = await response.json();
            
            if (result.data === 'Team does not exits') {
                toast(result.data, {
                    description: 'tip: you can see your registrations in profile',
                    action: {
                        label: 'Close',
                        onClick: () => {
                            console.log('close');
                        },
                    },
                });
            } else {
                setData(result.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const joinTeam = async () => {
        try {
            const response = await authFetch(
                `https://sstapi.pythonanywhere.com/api/team/join/${teamId}`
            );
            const result = await response.json();
            
            toast(result.data, {
                description: '',
                action: {
                    label: 'Close',
                    onClick: () => {
                        console.log('close');
                    },
                },
            });
            getTeam();
        } catch (e) {
            console.log(e);
        }
    };

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
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 container mx-auto px-4 py-8 md:px-6 max-w-4xl">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <h1 className="text-2xl text-center text-white">Loading...</h1>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="border-b border-gray-800 pb-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Team</h1>
                            <h2 className="text-2xl text-white mb-1">{data.program}</h2>
                            <p className="text-lg text-slate-300">Created by {data.team_lead}</p>
                        </div>
                        
                        <ScrollArea className="h-[50vh] pr-4">
                            {data.members && data.members.length === 0 ? (
                                <div className="text-center py-12 px-4">
                                    <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-2">No members in your team</h3>
                                    <p className="text-gray-400">Join the team or invite others to participate</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data.members && data.members.map((member, index) => (
                                        <Card key={index} className="border border-gray-800 bg-transparent">
                                            <CardHeader className="py-4">
                                                <CardTitle className="text-xl font-medium text-white">{member}</CardTitle>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                        
                        <div className="pt-4 flex justify-center">
                            <Button 
                                className="w-full md:w-auto px-8 py-2 h-12 dark" 
                                onClick={joinTeam}
                            >
                                Join Team
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <BottomNavBarComponent />
        </div>
    );
}