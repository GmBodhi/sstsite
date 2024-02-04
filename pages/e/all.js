import BlogCardComponent from "../../components/BlogCardComponent";
import Head from "next/head";
import BottomNavBarComponent from "../../components/BottomNavBarComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";
export default function All(){
    const [option,setOption] = useState("all");
    return(
        <div >
            <BottomNavBarComponent/>
            <Head>
                <meta name='theme-color' color='black'/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            <div className="blogContainer mb-10">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55,marginLeft:10}}>Events</h1>
                <Tabs defaultValue="all" className="dark m-5">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={()=>setOption("all")}>All</TabsTrigger>
                        <TabsTrigger value="music" onClick={()=>setOption("music")}>Music</TabsTrigger>
                        <TabsTrigger value="instruments" onClick={()=>setOption("instruments")}>Instruments</TabsTrigger>
                        <TabsTrigger value="dance" onClick={()=>setOption("dance")}>Dance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <BlogCardComponent/>
                    </TabsContent>
                    <TabsContent value="music">
                        
                    </TabsContent>
                </Tabs>
                
                {/* <p style={{color:'white',textAlign:'center',fontSize:28}}>events coming soon</p> */}
            </div>

        </div>
    );
}