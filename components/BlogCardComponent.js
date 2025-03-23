import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import DrawerComponent from './DrawerComponent';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShareIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
export default function BlogCardComponent({ option }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const { token, authFetch, isAuthenticated } = useAuth();
    const [registeringIds, setRegisteringIds] = useState({}); // Track loading state per event ID
    const [creatingTeamIds, setCreatingTeamIds] = useState({}); // Track team creation loading state
    const [showDialog, setShowDialog] = useState(false);
    const [members, setMembers] = useState({ program: '', team_lead: '', members: [] });
    const [drawerLoading, setDrawerLoading] = useState(false);
    
    const apireqProfile = async () => {
        try {
            setLoading(true);
            const response = await authFetch('https://sstapi.pythonanywhere.com/accounts/api/profile/');
            const profileResponse = await response.json();
            setProfile(profileResponse.data);
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && token) {
            apireqProfile();
        }
    }, [isAuthenticated, token]);

    const apireq = async () => {
        const controller = new AbortController();
        try {
            setLoading(true);
            const response = await authFetch(`https://sstapi.pythonanywhere.com/api/programs/${option}`);
            const eventResponse = await response.json();
            setData(eventResponse.data);
            setFilteredData(eventResponse.data);
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }

        return () => {
            controller.abort();
        };
    };
    
    const register = async (eventId) => {
        // Set loading state for this specific event ID
        setRegisteringIds(prev => ({ ...prev, [eventId]: true }));
        let toast_msg = '';
        try {
            const response = await fetch(`https://sstapi.pythonanywhere.com/api/register/${eventId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            });
            const data = await response.json();
            if (data.data) toast_msg = data.data;
            else if (data.error) toast_msg = data.error;

            // Update the local state to mark this event as registered
            if (data.data && !data.error) {
                setData(prevData => {
                    return prevData.map(event => {
                        if (event.id === eventId) {
                            return {...event, is_registered: true};
                        }
                        return event;
                    });
                });
                
                setFilteredData(prevData => {
                    return prevData.map(event => {
                        if (event.id === eventId) {
                            return {...event, is_registered: true};
                        }
                        return event;
                    });
                });
            }

            toast(toast_msg, {
                description: 'tip :you can see your registerations in profile',
                action: {
                    label: 'Close',
                    onClick: () => {
                        console.log('close');
                    },
                },
            });
        } catch (e) {
            console.log(e);
            toast(e, {
                description: 'tip :you can see your registerations in profile',
                action: {
                    label: 'Close',
                    onClick: () => {
                        console.log('close');
                    },
                },
            });
        } finally {
            // Clear loading state for this specific event ID
            setRegisteringIds(prev => ({ ...prev, [eventId]: false }));
        }
    };
    
    const createTeam = async (eventId) => {
        // Set loading state for this specific team creation
        setCreatingTeamIds(prev => ({ ...prev, [eventId]: true }));
        let toast_msg = '';
        try {
            const response = await fetch(`https://sstapi.pythonanywhere.com/api/team/create/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            
            const data = await response.json();
            
            if (data.data) {
                toast_msg = data.data;
                setShowDialog(true);
                
                // Update the local state to mark this event as registered
                setData(prevData => {
                    return prevData.map(event => {
                        if (event.id === eventId) {
                            return {...event, is_registered: true};
                        }
                        return event;
                    });
                });
                
                setFilteredData(prevData => {
                    return prevData.map(event => {
                        if (event.id === eventId) {
                            return {...event, is_registered: true};
                        }
                        return event;
                    });
                });
            } else if (data.error) {
                toast_msg = data.error;
            }
            
            toast(toast_msg, {
                description: "tip: you can see your registrations in profile",
                action: {
                    label: "Close",
                    onClick: () => { console.log('close') }
                },
            });
        } catch (e) {
            console.log(e);
            toast.error("Failed to create team", {
                description: "Please try again later",
            });
        } finally {
            setCreatingTeamIds(prev => ({ ...prev, [eventId]: false }));
        }
    };
    
    const getTeam = async (eventId) => {
        setDrawerLoading(true);
        try {
            const response = await authFetch(`https://sstapi.pythonanywhere.com/api/team/members/${profile.username}`);
            const teamData = await response.json();
            
            if (teamData.data) {
                setMembers({
                    program: teamData.data.program_name || '',
                    team_lead: teamData.data.team_lead || '',
                    members: teamData.data.members || []
                });
            }
        } catch (e) {
            console.log(e);
            toast.error("Failed to load team details");
        } finally {
            setDrawerLoading(false);
        }
    };
    
    useEffect(() => {
        if (isAuthenticated && token) {
            apireq();
        }
    }, [option, isAuthenticated, token]);

    // Filter events based on search query
    useEffect(() => {
        if (!data) return;

        if (searchQuery.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(
                (event) =>
                    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (event.program_comes_under &&
                        event.program_comes_under.toLowerCase().includes(searchQuery.toLowerCase())),
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
    };

    // Get filtered events that match the user's gender
    const genderFilteredEvents = filteredData?.filter(
        (event) => event.program_gender_type === profile.gender || event.program_gender_type === 'a',
    );

    return (
        <div className="space-y-6">
            {/* Team Code Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-semibold mb-2">Your team code</DialogTitle>
                        <DialogDescription className="text-gray-400 mb-4">
                            You can copy/paste and share this code with your team members to join your team
                        </DialogDescription>
                        <div className="flex w-full items-center space-x-3 mt-2">
                            <Input 
                                type="text" 
                                value={`https://sctarts.in/e/${profile.username}`} 
                                className="py-2"
                                readOnly
                            />
                            <Button 
                                type="submit" 
                                className="px-4 py-2"
                                onClick={() => {
                                    window.open(`whatsapp://send?text=Hi, link to join my team is https://sctarts.in/e/${profile.username} do not share with outside team members`);
                                }}
                            >
                                Share
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            
            {/* Search Box with animation for mobile and desktop */}
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="search"
                    placeholder="Search events by name or category..."
                    className="pl-10 pr-10 py-6 bg-gray-800 border-gray-700 text-white rounded-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
                {searchQuery && (
                    <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
                        <X className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                    </button>
                )}
            </div>

            {/* Search status indicator */}
            {searchQuery && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-gray-400">
                        Found {genderFilteredEvents?.length || 0} results for "{searchQuery}"
                    </p>
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-400"
                            onClick={clearSearch}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-pulse flex space-x-2">
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* No Results Message */}
            {!loading && genderFilteredEvents && genderFilteredEvents.length === 0 && (
                <div className="text-center py-12 px-4">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
                    <p className="text-gray-400">
                        {searchQuery
                            ? `No events matching "${searchQuery}" in the ${option} category`
                            : `No events available in the ${option} category for your profile`}
                    </p>
                    {searchQuery && (
                        <Button
                            variant="outline"
                            className="mt-4 border-red-700 text-red-500 hover:bg-red-900/20"
                            onClick={clearSearch}
                        >
                            Clear search
                        </Button>
                    )}
                </div>
            )}

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData?.map((event) => {
                    // Check if the user won for this event and show notification
                    if (event.first?.includes(profile.name) || event.second?.includes(profile.name) || event.third?.includes(profile.name)) {
                        toast.success(`Congrats 🎉 ${profile.name} you won for ${event.name}`, {
                            description: 'Go to view winners to see your position',
                            id: `win-${event.id}`, // Prevent duplicate toasts
                            duration: 5000,
                        });
                    }

                    // Only show events that match user's gender or are for all genders
                    if (event.program_gender_type === profile.gender || event.program_gender_type === 'a') {
                        const isRegistering = registeringIds[event.id] === true;
                        const isCreatingTeam = creatingTeamIds[event.id] === true;
                        const isLoading = isRegistering || isCreatingTeam;
                        
                        return (
                            <Card
                                className="dark border-gray-800 hover:border-gray-700 transition-all hover:shadow-md"
                                key={event.id}
                            >
                                <CardHeader>
                                    <CardTitle className="text-2xl font-medium">{event.name}</CardTitle>
                                    <CardDescription className="text-lg">{event.program_comes_under}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm flex items-center gap-2">
                                            <span className="text-gray-400">Type:</span>
                                            <span className="px-2 py-1 rounded bg-gray-800 text-white">
                                                {event.program_type === 'g' ? 'Group' : 'Individual'}
                                            </span>
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {!event.is_registered ? (
                                        <Button
                                            disabled={isLoading || event.is_registered}
                                            onClick={() => {
                                                if (event.program_type === 'g') {
                                                    createTeam(event.id);
                                                } else {
                                                    register(event.id);
                                                }
                                            }}
                                        >
                                            {isLoading ? 'Processing...' : 'Register'}
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button disabled>Registered</Button>
                                            {event.program_type === 'g' && (
                                                <>
                                                <Drawer>
                                                    <DrawerTrigger asChild>
                                                        <Button 
                                                            variant="outline"
                                                            onClick={() => getTeam(event.id)}
                                                        >
                                                            View team
                                                        </Button>
                                                    </DrawerTrigger>
                                                    <DrawerContent className="dark text-white h-[300px]">
                                                        {drawerLoading ? (
                                                            <h1 className="text-2xl text-center">loading...</h1>
                                                        ) : (
                                                            <div className="mx-auto w-full max-w-sm">
                                                                <DrawerHeader>
                                                                    <DrawerTitle>{members.program}</DrawerTitle>
                                                                    <DrawerDescription>Lead: {members.team_lead}</DrawerDescription>
                                                                </DrawerHeader>
                                                                <div className="p-4">
                                                                    {members.members.length === 0 ? (
                                                                        <Card className="w-auto dark mb-5">
                                                                            <CardHeader>
                                                                                <CardTitle className="text-2xl font-medium">No members in your team</CardTitle>
                                                                            </CardHeader>
                                                                        </Card>
                                                                    ) : (
                                                                        members.members.map((member, index) => (
                                                                            <Card className="w-auto dark mb-5" key={index}>
                                                                                <CardHeader>
                                                                                    <CardTitle className="text-xl font-medium">{member}</CardTitle>
                                                                                </CardHeader>
                                                                            </Card>
                                                                        ))
                                                                    )}
                                                                </div>
                                                                <DrawerFooter>
                                                                    <DrawerClose asChild>
                                                                        <Button variant="outline">Close</Button>
                                                                    </DrawerClose>
                                                                </DrawerFooter>
                                                            </div>
                                                        )}
                                                    </DrawerContent>
                                                </Drawer>
                                                <Button onClick={() => {
                                                    window.open(`whatsapp://send?text=Hi, link to join my team is https://sctarts.in/e/${profile.username} do not share with outside team members`);
                                                }} variant="outline"><ShareIcon className='w-4 h-4'/></Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
