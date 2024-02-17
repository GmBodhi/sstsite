import BottomNavBarComponent from '../components/BottomNavBarComponent';
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import DrawerComponent from '@/components/DrawerComponent';

/**
 *
 * @returns {Promise<{id: string, department: string, group_event_score: number, solo_event_score: number, overall_score: number}[]>}
 */
const fetchPoints = async () => {
    const res = await fetch('https://sstapi.pythonanywhere.com/api/departmentpoints/', {
        method:'GET'
    }).catch(() => void 0);

    const response = await res?.json().catch(() => void 0);

    if (!res?.ok || !response) {
        return;
    }

    const data = response.data;

    return data?.sort((b,a) => (a.solo_event_score + a.group_event_score) - (b.solo_event_score + b.group_event_score));
};
/**
 * 
 * @returns {Promise<{
 *              id:string,
 *              name:string,
 *              slot_time:Date,           
 *          }>} 
 */
const fetchLivePrograms = async ()=>{
    const programs = await fetch('https://sstapi.pythonanywhere.com/api/programs/live/',{
        method:'GET',
    })
    const programResponse = await programs.json();
    if(!programResponse)
        return; 
    return programResponse.data;
}
export default function About() {
    const [data, setData] = useState(null);
    const [liveData,setLiveData] = useState([]);
    const [loading,setLoading] = useState(true);
    const router = useRouter();
    const controller = new AbortController();
    useEffect(() => {
        fetchPoints().then((d) => {
            if (!d) toast.error('Failed to fetch points');
            setData(d);
            setLoading(false);
        });
        fetchLivePrograms().then((programData)=>{
            if(!programData)
                toast.error("Error in fetching live events !");
            setLiveData(programData);
            setLoading(false);
        });
        
        return ()=>{
            controller.abort();
        }
    }, []);
    setTimeout(()=>{
        router.reload();
    },5*60*1000);
    return (
        <div className="main">
            <BottomNavBarComponent />
            <div className="m-10 flex flex-col justify-items-center">
                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 0 }}>Points</h1>
                {loading==true ? <p className='text-white text-[20px] font-medium text-center'>loading...</p> :(
                <Table>
                    <TableCaption className="dark">Refresh to see updated results</TableCaption>
                    <TableHeader className="dark">
                        <TableRow className="dark">
                            <TableHead className="w-[100px] text-white">Department</TableHead>
                            <TableHead className="text-right text-white">Group</TableHead>
                            <TableHead className="text-right text-white">Solo</TableHead>
                            <TableHead className="text-right text-white">Overall</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="dark text-white">
                        {data?.map((i) => {
                            return (
                                <TableRow key={i.department}>
                                    <TableCell className="font-medium ">{i.department}</TableCell>
                                    <TableCell className="text-right">{i.group_event_score}</TableCell>
                                    <TableCell className="text-right">{i.solo_event_score}</TableCell>
                                    <TableCell className="text-right">{i.group_event_score+i.solo_event_score}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                )}

                <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}>Results</h1>
                <p className="text-gray-500 font-medium">Events with results announced swipe to see more</p>
                <ScrollArea className="w-full whitespace-nowrap ">
                    <div className="flex w-max space-x-4 p-4">
                        {liveData?.map((data,index)=>{
                            return(
                                <Card className="w-auto dark mb-5" key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-medium">{data.name}</CardTitle>
                                        <CardDescription>on {data.slot_time}</CardDescription>
                                    </CardHeader>
                                    <div className='m-5'>
                                        <DrawerComponent data={data}/>
                                    </div>
                                </Card>
                                );
                        })}
                        
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Footer />
            </div>
        </div>
    );
}
