import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoginComponent from './LoginComponent';
import { Button } from './ui/button';   
import { ScrollArea } from './ui/scroll-area';
import Footer from './FooterComponent';
import { useAuth } from '@/lib/hooks/useAuth';
import { ProfileChessCard } from './ChessCard';

export default function ProfileComponent() {
    // const router = useRouter();

    const [data, setData] = useState([]);
    const [option, setOption] = useState('individual');
    const [loading, setLoading] = useState(true);
    const [updateloading, setUpdateLoading] = useState(false);
    const [close, setClose] = useState(false);
    const departments = ['MEA', 'MEB', 'ECA', 'ECB'];
    const [selectdepartment, setSelectDepartment] = useState('default');
    const [deletingEventIds, setDeletingEventIds] = useState({});
    
    // Use the auth hook
    const { isAuthenticated, isLoading, token, logout, authFetch } = useAuth();

    const apireq = async () => {
        setLoading(true);
        try {
            const response = await authFetch('https://sstapi.pythonanywhere.com/accounts/api/profile/');
            const resdata = await response.json();
            setData(resdata.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const update = async () => {
        console.log(selectdepartment);
        setUpdateLoading(true);
        try {
            const response = await authFetch(
                `https://sstapi.pythonanywhere.com/accounts/api/profile/update/${selectdepartment}`,
                { method: 'POST' }
            );
            const resdata = await response.json();
            setClose(true);
            apireq();
        } catch (e) {
            console.log(e);
        } finally {
            setUpdateLoading(false);
        }
    };

    const deleteEvent = async (eventId) => {
        // Set loading state for this specific event ID
        setDeletingEventIds(prev => ({ ...prev, [eventId]: true }));
        try {
            const response = await authFetch(
                `https://sstapi.pythonanywhere.com//api/program/delete/${eventId}`,
                { method: 'DELETE' }
            );
            const resdata = await response.json();
            toast(resdata.data, {
                description: 'tip: you can again register for this event if you change your mind',
                action: {
                    label: 'Close',
                    onClick: () => {
                        console.log('close');
                    },
                },
            });
            apireq();
        } catch (e) {
            console.log(e);
            toast(e, {
                description: 'tip: you can again register for this event if you change your mind',
                action: {
                    label: 'Close',
                    onClick: () => {
                        console.log('close');
                    },
                },
            });
        } finally {
            // Clear loading state for this specific event ID
            setDeletingEventIds(prev => ({ ...prev, [eventId]: false }));
        }
    };

    useEffect(() => {
        if (isAuthenticated && token) {
            apireq();
        }
    }, [isAuthenticated, token]);

    return (
        <div>
            {!isAuthenticated ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <LoginComponent />
                </div>
            ) : (
                <>
                    {loading == true && (
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
                    )}
                    
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
                                {data.group_registered_events && data.group_registered_events.length > 0 ? (
                                    data.group_registered_events.map((i, index) => {
                                        const isDeleting = deletingEventIds[i.program.id] === true;
                                        return (
                                            <Card className="w-auto dark mb-5" key={index}>
                                                <CardHeader>
                                                    <CardTitle className="text-3xl font-medium">{i.program.name}</CardTitle>
                                                    {/* <CardDescription className="text-1xl ">created by {data.name==i.program.created_by ? 'you': i.program.created_by}</CardDescription> */}
                                                </CardHeader>
                                                <Button
                                                    onClick={() => deleteEvent(i.program.id)}
                                                    className="m-5 bg-red-500 text-white"
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting 
                                                        ? 'Deleting...' 
                                                        : (data.name === i.program.created_by ? 'Delete team' : 'Leave team')}
                                                </Button>
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
                                {data.solo_registered_events && data.solo_registered_events.length > 0 ? (
                                    data.solo_registered_events.map((i, index) => {
                                        const isDeleting = deletingEventIds[i.program.id] === true;
                                        return (
                                            <Card className="w-auto dark mb-5" key={index}>
                                                <CardHeader>
                                                    <CardTitle className="text-3xl font-medium">{i.program.name}</CardTitle>
                                                </CardHeader>
                                                <Button
                                                    onClick={() => deleteEvent(i.program.id)}
                                                    className="m-5 bg-red-500 text-white"
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <p className="text-white text-center mt-5">No Individual registered events found</p>
                                )}
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                    {loading == false && <Footer />}
                </>
            )}
        </div>
    );
}
