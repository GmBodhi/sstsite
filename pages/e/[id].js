import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card,CardHeader,CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoginComponent from "@/components/LoginComponent";
import BottomNavBarComponent from "@/components/BottomNavBarComponent";
export default function Blog(){
    const get_id = useRouter();
    let team_id=get_id.query.id;
    const [Data,setData]=useState({});
    const [routerReady,setRouterReady]=useState(false);
    const [loading,setLoading]=useState(true);
    const [isLogged,setIsLogged]=useState(false);
    const [token,setToken] = useState(null);
    const getTeam=()=>{
        
        fetch(`https://sstapi.pythonanywhere.com/api/team/members/${team_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            if(get_id.isReady==true){
                setRouterReady(true);
                setData(data.data);
                setLoading(false);
               }
               
            
            
        })
        .catch(e=>{console.log(e)})

    }
    const joinTeam=()=>{
        
        fetch(`https://sstapi.pythonanywhere.com/api/team/join/${team_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            toast(data.data, {
                description: "",
                action: {
                  label: "Close",
                  onClick:()=>{console.log('close')}
                },
            })
            setLoading(false);
            getTeam();

        })
        .catch(e=>{console.log(e)})

    }
    const getToken=()=>{
        setToken(localStorage.getItem("token"));
        if(localStorage.getItem("token")){
            setIsLogged(true);
        }
    } 
    useEffect(()=>{
        getToken();
         

    },[])
    useEffect(()=>{
        if(routerReady!=true){
            if(token)
                getTeam();
        } 
        
    },[token]) 
    return(
       <div>
        <h1>Team</h1>
        {isLogged==false ? 
            <div className="m-10 flex flex-col justify-items-center">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55}}>Team</h1>
                <p className="text-white mb-[10px]">Login it to view the team</p>
                <LoginComponent />
            </div>
            :(
                <div className="flex flex-col justify-items-center m-[10px]">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold'}}>Team</h1>    
                <h1 className="text-2xl text-white">{Data.program}</h1>
                <p className="text-1xl text-slate-200 mb-[10px]">Created by {Data.team_lead}</p>
                {loading==true ? <h1>loading...</h1>:(
                    <>
                    <ScrollArea>
                    {
                        Data.members.length==0 && 
                        <Card className="w-auto dark m-5" >
                            <CardHeader>
                                <CardTitle className="text-2xl font-medium">No members in your team</CardTitle>
                            </CardHeader>
                        </Card>
                    }
                    {
                    Data.members.map((index,i)=>{
                        return(
                         
                            <Card className="w-auto dark mb-5" key={index}>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-medium">{i}</CardTitle>
                                </CardHeader>
                            </Card>
                        
                        );
                    })}
                    </ScrollArea>
                    <Button className="dark" onClick={
                        ()=>{
                            joinTeam();
                        }
                    }>Join Team</Button>
                    </>
                )
                }
                </div>
                
            ) 
        }
        <BottomNavBarComponent/>
       </div>
    )
}