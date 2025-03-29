'use client'
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Footer from '@/components/FooterComponent';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DrawerComponent from '@/components/DrawerComponent';
import { motion } from 'framer-motion';
/**
 *
 * @returns {Promise<{id: string, department: string, group_event_score: number, solo_event_score: number, overall_score: number}[]>}
 */
const fetchPoints = async () => {
    try {
        const res = await fetch('https://sstapi.pythonanywhere.com/api/departmentpoints/', {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch points data');
        }

        const response = await res.json();
        const data = response.data || [];

        return data.sort((b, a) => (a.solo_event_score + a.group_event_score) - (b.solo_event_score + b.group_event_score));
    } catch (error) {
        console.error('Error fetching points:', error);
        return [];
    }
};
/**
 * 
 * @returns {Promise<{
 *              id:string,
 *              name:string,
 *              slot_time:Date,           
 *          }[]>} 
 */
const fetchLivePrograms = async () => {
    try {
        const programs = await fetch('https://sstapi.pythonanywhere.com/api/programs/live/', {
            method: 'GET',
            cache: 'no-store'
        });

        if (!programs.ok) {
            throw new Error('Failed to fetch live programs');
        }

        const programResponse = await programs.json();
        return programResponse.data || [];
    } catch (error) {
        console.error('Error fetching live programs:', error);
        return [];
    }
};

/**
 * Format a date string into a human-readable format
 * @param {string} dateString - ISO date string (e.g., "2025-03-28T10:00:00")
 * @returns {string} - Formatted date string
 */
const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
        const date = new Date(dateString);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        
        // Options for formatting
        const options = { 
            weekday: 'short',
            day: 'numeric', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        
        return date.toLocaleString('en-US', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // Return original string if error
    }
};

export default function PointsPage() {
    const [data, setData] = useState([]);
    const [liveData, setLiveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const refreshTimerRef = useRef(null);
    
    const tempPirorityResult = [
        {department: 'MEB', rank: 1},
        {department: 'BT', rank: 2},
        {department: 'ECB', rank: 3},
        {department: 'MEA', rank: 3}
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pointsData = await fetchPoints();
                setData(pointsData);
                
                const programData = await fetchLivePrograms();
                setLiveData(programData);
            } catch (error) {
                toast.error('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
        // Set up auto-refresh every 5 minutes
        refreshTimerRef.current = setInterval(() => {
            fetchData();
        }, 5 * 60 * 1000);
        
        return () => {
            if (refreshTimerRef.current) {
                clearInterval(refreshTimerRef.current);
            }
        };
    }, []);
    
    return (
        <div className="main">
            <BottomNavBarComponent />
            <div className="m-10 flex flex-col justify-items-center">
                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 0 }}>Points</h1>
                {loading ? (
                    <p className='text-white text-[20px] font-medium text-center'>Loading...</p>
                ) : (
                <>
                {/* Temporarily hidden Champions card */}
                <div>
                {data.length > 0 ? (
                    <Card className="w-auto dark mb-5">
                        <motion.img 
                            src='https://static.vecteezy.com/system/resources/previews/028/754/694/original/3d-purple-trophy-cup-winner-champion-icon-for-ui-ux-web-mobile-apps-social-media-ads-designs-png.png'
                            width={100}
                            height={100}
                            className='ml-1'
                            initial={{ opacity: 0, transform: 'scale(0.6)' }}
                            whileInView={{ opacity: 1, transform: 'scale(1)' }}
                            transition={{ ease: 'easeIn', duration: 1 }}
                        />
                        <CardHeader>
                            <CardTitle className="text-3xl font-medium">Champions {data[0]?.department}</CardTitle>
                            <CardDescription>with score {data[0]?.group_event_score + data[0]?.solo_event_score}</CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <p className='text-white text-[20px] font-medium text-center'>No points data available</p>
                )}
                </div>
                
                {data.length > 0 && (
                    <Table>
                        <TableCaption className="dark">Auto-refreshes every 5 minutes</TableCaption>
                        <TableHeader className="dark">
                            <TableRow className="dark">
                                <TableHead className="w-[100px] text-white">Department</TableHead>
                                <TableHead className="text-right text-white">Group</TableHead>
                                <TableHead className="text-right text-white">Solo</TableHead>
                                <TableHead className="text-right text-white">Overall</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="dark text-white">
                            {data.map((i, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{i.department}</TableCell>
                                    <TableCell className="text-right">{i.group_event_score === 0 ? "-" : i.group_event_score}</TableCell>
                                    <TableCell className="text-right">{i.solo_event_score === 0 ? "-" : i.solo_event_score}</TableCell>
                                    <TableCell className="text-right">{i.group_event_score + i.solo_event_score === 0 ? "-" : i.group_event_score + i.solo_event_score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {/* Temporarily hidden Vilambara Jadha Results */}
                <div style={{ display: 'none' }}>
                <h2 className='text-white font-medium text-[20px] mt-10 mb-2'>Vilambara Jadha Results 🎉</h2>
                <p className='text-gray-500 text-[15px] font-medium'>Swipe to see more</p>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-4 p-4">
                    {tempPirorityResult.map((winner, index) => (
                        <Card className="w-auto dark mb-2" key={index}>
                            <CardHeader>
                                <CardTitle className="text-3xl font-medium">{winner.department}</CardTitle>
                                <CardDescription>Rank {winner.rank}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                </div>
                </>
                )}

                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}>Live Events</h1>
                <p className="text-gray-500 font-medium">Live events are events that are currently happening</p>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-4 p-4">
                        {liveData.length > 0 ? (
                            liveData.map((eventData, index) => (
                                <Card className="w-auto dark mb-5" key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-medium">{eventData.name}</CardTitle>
                                        <CardDescription>on {formatDate(eventData.slot_time)}</CardDescription>
                                    </CardHeader>
                                    <div className='m-5'>
                                        <DrawerComponent data={eventData} />
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className='text-white text-[20px] font-medium'>No live events available</p>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Footer />
            </div>
        </div>
    );
}
