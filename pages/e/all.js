import BlogCardComponent from "../../components/BlogCardComponent";
import Head from "next/head";
import BottomNavBarComponent from "../../components/BottomNavBarComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginComponent from "@/components/LoginComponent";
import { useState,useEffect } from "react";
export default function All(){
    const [option,setOption] = useState("all");
    const [token,setToken] = useState(null);
    const [isLogged,setIsLogged]=useState(false);
    const getToken=()=>{
        setToken(localStorage.getItem("token"));
        if(localStorage.getItem("token")){
            setIsLogged(true);
        }
    } 
     useEffect(()=>{
        getToken();
    },[token])
    return(
        <div >
            <BottomNavBarComponent/>
            <Head>
                <meta name='theme-color' color='black'/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            {token==null ? 
             <div className="m-10 flex flex-col justify-items-center">
                <LoginComponent/>
             </div>
            :(
            <div className="blogContainer mb-10">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55,marginLeft:10}}>Events</h1>
                <Tabs defaultValue="all" className="dark m-3">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all" onClick={()=>setOption("all")}>All</TabsTrigger>
                        <TabsTrigger value="music" onClick={()=>setOption("music")}>Music</TabsTrigger>
                        <TabsTrigger value="instruments" onClick={()=>setOption("instruments")}>Instrument</TabsTrigger>
                        <TabsTrigger value="dance" onClick={()=>setOption("dance")}>Dance</TabsTrigger>
                        <TabsTrigger value="literary" >Literary</TabsTrigger>
                    </TabsList>
                    <TabsContent value={option}>
                        <BlogCardComponent option={option}/>
                    </TabsContent>
                    <TabsContent value={'literary'}>
                       <p className="text-white text-center">Literary events coming soon</p>
                    </TabsContent>
                </Tabs>
                
                {/* <p style={{color:'white',textAlign:'center',fontSize:28}}>events coming soon</p> */}
            </div>
            )}

        </div>
    );
}