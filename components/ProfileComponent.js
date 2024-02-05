import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
 
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default function ProfileComponent(){
    const [data,setData] = useState([]);
    const [option, setOption] = useState('individual')
    const [loading,setLoading] = useState(true);
    const apireq=()=>{
    setLoading(true);
    fetch('https://sstapi.pythonanywhere.com/accounts/api/profile/',{
        method:'GET',
        headers:{
        'Content-Type':'application/json',
        'Authorization': 'Token d6a8d991036f1e8d0ee85e694523384c7c971f85'
        
        },
    })
    .then(response=>response.json())
    .then(data=>{
        setData(data.data);
        setLoading(false);
    })
    .catch(e=>{console.log(e)})
    }

    useEffect(()=>{
    
    apireq();
    },[]) 
    return(
        <div>
            {loading==true ? <p style={{color:'white',textAlign:'center',fontSize:34,fontFamily:'Enhanced LED Board-7'}}>loading...</p>:(
                <>
                    <Card className="w-auto bg-gradient-to-r from-cyan-500 to-blue-500 ml-[10px] mr-[10px] mt-[10px]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-medium text-white">{data.name}</CardTitle>
                        <CardDescription className="text-1xl text-white">{data.department}</CardDescription>
                    </CardHeader>
                                    
                </Card>
                <Tabs defaultValue="Individual" className="dark ml-[10px] mr-[10px] mt-[10px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="Individual" onClick={()=>setOption("Individual")}>Individual</TabsTrigger>
                            <TabsTrigger value="Group" onClick={()=>setOption("Group")}>Group</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Group">
                        {data.group_registered_events && data.group_registered_events.length > 0 ? (
                            data.group_registered_events.map((i, index) => (
                                <Card className="w-auto dark mb-5" key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-medium">{i}</CardTitle>
                                    </CardHeader>
                                </Card>
                            ))
                        ) : (
                            <p>No registered events found</p>
                        )}
                    </TabsContent>
                    

                    
                    <TabsContent value="Individual">
                        {data.solo_registered_events && data.solo_registered_events.length > 0 ? (
                            data.solo_registered_events.map((i, index) => (
                                <Card className="w-auto dark mb-5" key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-medium">{i}</CardTitle>

                                    </CardHeader>
                                    
                                </Card>
                            ))
                        ) : (
                            <p>No registered events found</p>
                        )}
                        
                    </TabsContent>
                </Tabs>
                </>
            )}
        </div>

    )
}