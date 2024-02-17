import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { toast } from 'sonner';

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
                            <Drawer>
                              <DrawerTrigger>
                                <Button
                                    disabled={i.first == "None" ? true : false}
                                    onClick={() => {
                                        console.log("opened");
                                    }}
                                >
                                    {i.first == "None" ? 'Result will come soon' : 'View Winners'}
                                </Button>
                              </DrawerTrigger>
                            <DrawerContent className="dark text-white h-[500px]">
                                  <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                      <DrawerTitle>{i.name}</DrawerTitle>
                                      <DrawerDescription>Winners</DrawerDescription>
                                    </DrawerHeader>
                                    <Card className="w-auto dark mb-5" >
                                          <CardHeader>
                                              <CardTitle className="text-2xl font-medium">#First {i.first}</CardTitle>
                                          </CardHeader>
                                    </Card>
                                    {i.second!="None" && 
                                      <Card className="w-auto dark mb-5" >
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-medium">#Second {i.second}</CardTitle>
                                        </CardHeader>
                                      </Card>
                                    }
                                    {i.third!="None" && 
                                      <Card className="w-auto dark mb-5" >
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-medium">#Third {i.third}</CardTitle>
                                        </CardHeader>
                                      </Card>
                                    }
                                  </div>
                              <DrawerFooter>
                                  <DrawerClose>
                                    <Button className="w-full">Close</Button>
                                  </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                            </CardFooter>
                        </Card>
                    );
                }
            })}
        </div>
    );
}
