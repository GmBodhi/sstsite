import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import DrawerComponent from './DrawerComponent';

export default function BlogCardComponent({ option }) {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);
    const token = localStorage.getItem('token');

    const apireqProfile = async() => {
        try{
            setLoading(true);
            const profileAPI = await fetch('https://sstapi.pythonanywhere.com/accounts/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            const profileResponse = await profileAPI.json();
            setProfile(profileResponse.data);
        }catch(err){
            toast.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        apireqProfile();
    }, [token]);

    const apireq = async () => {
        const controller = new AbortController();
        try{
            setLoading(true);
            const eventAPI = await fetch(`https://sstapi.pythonanywhere.com/api/programs/${option}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            const eventResponse = await eventAPI.json();
            setData(eventResponse.data);
           
        }catch(err){
            toast.error(err);
        }
        setLoading(false);
        return () => {
            controller.abort();
        };
    };
    useEffect(() => {
        apireq();
    }, []);

    return (
        <div className="w3-row-padding">
            {loading == true && (
                <p style={{ color: 'white', textAlign: 'center', fontSize: 34, fontFamily: 'Enhanced LED Board-7' }}>
                    loading...
                </p>
            )}
            {Data?.map((i) => {
                if(i.first===profile.name || i.second===profile.name || i.third===profile.name){
                    console.log(i.name);
                    toast(`Congrats 🎉 ${profile.name} you won for ${i.name} `, {
                        description: 'go to view winners to see your position',
                        action: {
                            label: 'Close',
                            onClick: () => {
                                console.log('close');
                            },
                        },
                    });
                    
                }
                if (i.program_gender_type == profile.gender || i.program_gender_type == 'a') {
                    return (
                        <Card className="w-auto dark mb-5" key={i.id}>
                            <CardHeader>
                                <CardTitle className="text-3xl font-medium">{i.name}</CardTitle>
                                <CardDescription className="text-2xl">{i.program_comes_under}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p className="text-lg">Type: {i.program_type == 'g' ? 'Group' : 'Individual'}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <DrawerComponent data={i}/>
                            </CardFooter>
                        </Card>
                    );
                }
            })}
        </div>
    );
}
