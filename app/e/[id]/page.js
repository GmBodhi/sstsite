'use client'
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoginComponent from '@/components/LoginComponent';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Blog() {
    const router = useRouter();
    const params = useParams();
    const [teamId, setTeamId] = useState(null);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    
    const { isAuthenticated, authFetch } = useAuth();

    useEffect(() => {
        // Get team ID from params
        if (params?.id) {
            setTeamId(params.id);
        }
    }, [params]);

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

    return (
        <div>
            <h1>Team</h1>
            {!isAuthenticated ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <h1
                        style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}
                        className="text-white "
                    >
                        Team
                    </h1>
                    <p className="text-white mb-[10px]">Login to view the team</p>
                    <LoginComponent />
                </div>
            ) : (
                <div className="flex flex-col justify-items-center m-[10px]">
                    {loading ? (
                        <h1 className="text-2xl text-center text-white">loading...</h1>
                    ) : (
                        <>
                            <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold' }}>Team</h1>
                            <h1 className="text-2xl text-white">{data.program}</h1>
                            <p className="text-1xl text-slate-200 mb-[10px]">Created by {data.team_lead}</p>
                            <ScrollArea>
                                {data.members && data.members.length === 0 && (
                                    <Card className="w-auto dark m-5">
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-medium">
                                                No members in your team
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                )}
                                {data.members &&
                                    data.members.map((i, index) => {
                                        return (
                                            <Card className="w-auto dark mb-5" key={index}>
                                                <CardHeader>
                                                    <CardTitle className="text-3xl font-medium">{i}</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        );
                                    })}
                            </ScrollArea>
                            <Button className="dark mb-20" onClick={joinTeam}>
                                Join Team
                            </Button>
                        </>
                    )}
                </div>
            )}
            <BottomNavBarComponent />
        </div>
    );
}