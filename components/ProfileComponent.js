import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from '@/components/ui/drawer';
import { ShareIcon } from 'lucide-react';
import LoginComponent from './LoginComponent';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import Footer from './FooterComponent';
import { useAuth } from '@/lib/hooks/useAuth';
import { ProfileChessCard } from './ChessCard';
import DrawerComponent from './DrawerComponent';

export default function ProfileComponent() {
    const [data, setData] = useState([]);
    const [option, setOption] = useState('individual');
    const [loading, setLoading] = useState(true);
    const [updateloading, setUpdateLoading] = useState(false);
    const [close, setClose] = useState(false);
    const departments = ['MEA', 'MEB', 'ECA', 'ECB'];
    const [selectdepartment, setSelectDepartment] = useState('default');
    const [teamMembers, setTeamMembers] = useState({ program: '', team_lead: '', members: [] });
    const [teamLoading, setTeamLoading] = useState(false);
    const [eventResults, setEventResults] = useState({});
    const [resultsLoading, setResultsLoading] = useState(true);

    // Use the auth hook
    const { isAuthenticated, isLoading, token, logout, authFetch } = useAuth();

    const apireq = async () => {
        setLoading(true);
        try {
            const response = await authFetch('https://sstapi.pythonanywhere.com/accounts/api/profile/');
            const resdata = await response.json();
            setData(resdata.data);
            
            // After getting profile data, fetch results for all registered events
            if (resdata.data) {
                const allEvents = [
                    ...(resdata.data.solo_registered_events || []).map(event => event.program.id),
                    ...(resdata.data.group_registered_events || []).map(event => event.program.id)
                ];
                
                if (allEvents.length > 0) {
                    await fetchAllEventResults(allEvents);
                }
            }
            
        } catch (e) {
            console.log(e);
            toast.error("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const update = async () => {
        setUpdateLoading(true);
        try {
            const response = await authFetch(
                `https://sstapi.pythonanywhere.com/accounts/api/profile/update/${selectdepartment}`,
                { method: 'POST' },
            );
            const resdata = await response.json();
            setClose(true);
            apireq();
        } catch (e) {
            console.log(e);
            toast.error("Failed to update profile");
        } finally {
            setUpdateLoading(false);
        }
    };

    const fetchAllEventResults = async (eventIds) => {
        setResultsLoading(true);
        
        try {
            // Create an object to store results
            const results = {};
            
            // Use Promise.all to fetch all results in parallel
            await Promise.all(
                eventIds.map(async (eventId) => {
                    try {
                        const response = await authFetch(`https://sstapi.pythonanywhere.com/api/programs/${eventId}`);
                        const result = await response.json();
                        
                        if (result.data) {
                            results[eventId] = result.data;
                        }
                    } catch (error) {
                        console.error(`Error fetching results for event ${eventId}:`, error);
                    }
                })
            );
            
            // Update state with all results at once
            setEventResults(results);
            
        } catch (e) {
            console.error("Error fetching event results:", e);
            toast.error("Failed to load some event results");
        } finally {
            setResultsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && token) {
            apireq();
        }
    }, [isAuthenticated, token]);

    // Helper function to check if event has results
    const hasResults = (eventData) => {
        return eventData && (
            (eventData.first?.length > 0) || 
            (eventData.second?.length > 0) || 
            (eventData.third?.length > 0)
        );
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <LoginComponent />
                </div>
            ) : (
                <>
                    {loading ? (
                        <p
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 34,
                                fontFamily: 'Enhanced LED Board-7',
                            }}
                        >
                            loading...
                        </p>
                    ) : (
                        <>
                            <ProfileChessCard
                                data={data}
                                departments={departments}
                                selectdepartment={selectdepartment}
                                setSelectDepartment={setSelectDepartment}
                                close={close}
                                updateloading={updateloading}
                                update={update}
                                logout={logout}
                            />

                            <Tabs defaultValue="Individual" className="dark ml-[10px] mr-[10px] mt-[10px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="Individual" onClick={() => setOption('Individual')}>
                                        Individual
                                    </TabsTrigger>
                                    <TabsTrigger value="Group" onClick={() => setOption('Group')}>
                                        Group
                                    </TabsTrigger>
                                </TabsList>
                                <ScrollArea>
                                    <TabsContent value="Group">
                                        {resultsLoading ? (
                                            <div className="flex justify-center py-4">
                                                <p className="text-white">Loading event results...</p>
                                            </div>
                                        ) : data.group_registered_events && data.group_registered_events.length > 0 ? (
                                            data.group_registered_events.map((i, index) => {
                                                const eventResult = eventResults[i.program.id];
                                                const resultsAnnounced = hasResults(eventResult);
                                                
                                                return (
                                                    <Card className="w-auto dark mb-5" key={index}>
                                                        <CardHeader>
                                                            <CardTitle className="text-3xl font-medium">
                                                                {i.program.name}
                                                            </CardTitle>
                                                            <CardDescription>Group Event</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="flex flex-row justify-between">
                                                            {eventResult ? (
                                                                resultsAnnounced ? (
                                                                    <DrawerComponent data={eventResult} />
                                                                ) : (
                                                                    <Button variant="secondary" disabled>Results not announced</Button>
                                                                )
                                                            ) : (
                                                                <Button variant="secondary" disabled>Could not load results</Button>
                                                            )}
                                                            
                                                            {i.program.created_by === data.name && (
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        const message = encodeURIComponent(
                                                                            `Hi! I'm inviting you to join my team. \n` +
                                                                                `Click here to join: https://sctarts.com/e/${data.username} \n` +
                                                                                `(Please do not share this link with anyone outside our team)`,
                                                                        );
                                                                        window.open(`whatsapp://send?text=${message}`);
                                                                    }}
                                                                >
                                                                    <ShareIcon className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })
                                        ) : (
                                            <p className="text-white text-center mt-5">No Group registered events found</p>
                                        )}
                                    </TabsContent>
                                </ScrollArea>
                                <ScrollArea>
                                    <TabsContent value="Individual">
                                        {resultsLoading ? (
                                            <div className="flex justify-center py-4">
                                                <p className="text-white">Loading event results...</p>
                                            </div>
                                        ) : data.solo_registered_events && data.solo_registered_events.length > 0 ? (
                                            data.solo_registered_events.map((i, index) => {
                                                const eventResult = eventResults[i.program.id];
                                                const resultsAnnounced = hasResults(eventResult);
                                                
                                                return (
                                                    <Card className="w-auto dark mb-5" key={index}>
                                                        <CardHeader>
                                                            <CardTitle className="text-3xl font-medium">
                                                                {i.program.name}
                                                            </CardTitle>
                                                            <CardDescription>Individual Event</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            {eventResult ? (
                                                                resultsAnnounced ? (
                                                                    <DrawerComponent data={eventResult} />
                                                                ) : (
                                                                    <Button variant="secondary" disabled>Results not announced</Button>
                                                                )
                                                            ) : (
                                                                <Button variant="secondary" disabled>Could not load results</Button>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })
                                        ) : (
                                            <p className="text-white text-center mt-5">No Individual registered events found</p>
                                        )}
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>
                            <Footer />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
