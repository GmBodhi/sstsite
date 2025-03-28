import { useState, useEffect, useRef } from 'react';
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
    const [profileLoading, setProfileLoading] = useState(false);
    const [profile, setProfile] = useState({
        username: '', 
        name: '', 
        gender: '', // Can be 'm', 'f', or empty
        email: ''
    });
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const { token, authFetch, isAuthenticated } = useAuth();
    const [registeringIds, setRegisteringIds] = useState({}); // Track loading state per event ID
    const [creatingTeamIds, setCreatingTeamIds] = useState({}); // Track team creation loading state
    const [showDialog, setShowDialog] = useState(false);
    const [members, setMembers] = useState({ program: '', team_lead: '', members: [] });
    const [drawerLoading, setDrawerLoading] = useState(false);
    // Create a ref to store the abort controller
    const abortControllerRef = useRef(new AbortController());
    
    // Function to create a new abort controller
    const createNewAbortController = () => {
        abortControllerRef.current.abort(); // Abort any existing requests
        abortControllerRef.current = new AbortController(); // Create new controller
        return abortControllerRef.current;
    };
    
    const apireqProfile = async () => {
        // Skip fetching if we already have valid profile data
        if (profileLoaded && profile && profile.username && profile.gender) {
            return;
        }
        
        try {
            setProfileLoading(true);
            const response = await authFetch('https://sstapi.pythonanywhere.com/accounts/api/profile/', {
                signal: abortControllerRef.current.signal
            });
            const profileResponse = await response.json();
            if (profileResponse.data) {
                setProfile(profileResponse.data);
                setProfileLoaded(true); // Mark profile as loaded
            } else {
                // If we didn't get valid data, set profileLoaded to false so we can retry
                setProfileLoaded(false);
            }
        } catch (err) {
            setProfileLoaded(false);
            if (err.name !== 'AbortError') {
                toast.error(err);
            }
        } finally {
            setProfileLoading(false);
        }
    };
    
    const apireq = async () => {
        try {
            setLoading(true);
            const response = await authFetch(`https://sstapi.pythonanywhere.com/api/programs/${option}`, {
                signal: abortControllerRef.current.signal
            });
            const eventResponse = await response.json();
            setData(eventResponse.data);
            setFilteredData(eventResponse.data);
        } catch (err) {
            if (err.name !== 'AbortError') {
                toast.error(err);
            }
        } finally {
            setLoading(false);
        }
    };
        
    const getTeam = async () => {
        setDrawerLoading(true);
        
        // Create a new controller for this operation
        const controller = createNewAbortController();
        
        try {
            const response = await authFetch(`https://sstapi.pythonanywhere.com/api/team/members/${profile.username}`, {
                signal: controller.signal
            });
            const teamData = await response.json();
            
            if (teamData.data) {
                setMembers({
                    program: teamData.data.program_name || '',
                    team_lead: teamData.data.team_lead || '',
                    members: teamData.data.members || []
                });
            }
        } catch (e) {
            // Don't show error for aborted requests
            if (e.name !== 'AbortError') {
                // Error handling
                toast.error("Failed to load team details");
            }
        } finally {
            setDrawerLoading(false);
        }
    };
    
    // Handle search input change with abort control
    const handleSearchChange = (e) => {
        createNewAbortController();
        setSearchQuery(e.target.value);
    };

    // Clear search with abort control
    const clearSearch = () => {
        createNewAbortController();
        setSearchQuery('');
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            abortControllerRef.current.abort();
        };
    }, []);
    
    // Reset profileLoaded when auth status changes
    useEffect(() => {
        if (!isAuthenticated) {
            setProfileLoaded(false);
            setProfile({
                username: '', 
                name: '', 
                gender: '',
                email: ''
            });
        }
    }, [isAuthenticated]);
    
    // Fetch data when option, auth state changes
    useEffect(() => {
        if (isAuthenticated && token) {
            const controller = createNewAbortController();
            apireq();
            apireqProfile();
        }
    }, [option, isAuthenticated, token]);

    // Filter events based on search query
    useEffect(() => {
        if (!data) return;

        // Skip filtering if profile data isn't loaded yet
        if (!profileLoaded) return;
        
        if (searchQuery.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((event) => {
                // Check if event name or program_comes_under contains the search query (case insensitive)
                const nameMatch = event.name?.toLowerCase().includes(searchQuery.toLowerCase());
                const categoryMatch = event.program_comes_under?.toLowerCase().includes(searchQuery.toLowerCase());
                const descriptionMatch = event.description?.toLowerCase().includes(searchQuery.toLowerCase());
                
                return nameMatch || categoryMatch || descriptionMatch;
            });
            
            setFilteredData(filtered);
        }
    }, [searchQuery, data, profileLoaded]);

    // Get filtered events that match the user's gender
    const genderFilteredEvents = filteredData?.filter(
        (event) => {
            // If profile is not loaded yet or gender not set, don't filter by gender
            if (!profile || !profile.gender) {
                return true; // Show all events if we don't have gender information
            }
            
            // 'a' means all genders are allowed
            return event.program_gender_type === profile.gender || event.program_gender_type === 'a';
        }
    );

    return (
        <div className="space-y-6">
            {/* Team Code Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-semibold mb-2">Your team code</DialogTitle>
                        <DialogDescription className="text-gray-400 mb-4">
                            Share this link with your team members to join your team
                        </DialogDescription>
                        <div className="flex w-full items-center space-x-3 mt-2">
                            <Input 
                                type="text" 
                                value={`https://sctarts.com/e/${profile.username}`} 
                                className="py-2"
                                readOnly
                            />
                            <Button 
                                type="submit" 
                                className="px-4 py-2"
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        `Hi! I'm inviting you to join my team. \n` +
                                        `Click here to join: https://sctarts.com/e/${profile.username} \n` +
                                        `(Please do not share this link with anyone outside our team)`
                                    );
                                    window.open(`whatsapp://send?text=${message}`);
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
                {genderFilteredEvents?.map((event) => {
                    // Check if the user won for this event and show notification
                    if (event.first?.includes(profile.name) || event.second?.includes(profile.name) || event.third?.includes(profile.name)) {
                        toast.success(`Congrats 🎉 ${profile.name} you won for ${event.name}`, {
                            description: 'Go to view winners to see your position',
                            id: `win-${event.id}`, // Prevent duplicate toasts
                            duration: 5000,
                        });
                    }

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
                                {/* Use the existing DrawerComponent for winners */}
                                {(event.first?.length > 0 || event.second?.length > 0 || event.third?.length > 0) ? (
                                    <DrawerComponent data={event} />
                                ) : (
                                    <Button variant="secondary" disabled>Results not announced</Button>
                                )}
                                
                                {event.program_type === 'g' && event.is_registered && (
                                    <div className="flex gap-2">
                                        <Drawer>
                                            <DrawerTrigger asChild>
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => getTeam()}
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
                                            window.open(`whatsapp://send?text=Hi, link to join my team is https://sctarts.com/e/${profile.username} do not share with outside team members`);
                                        }} variant="outline"><ShareIcon className='w-4 h-4'/></Button>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
