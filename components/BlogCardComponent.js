import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"
 
export default function BlogCardComponent(){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const router =useRouter();
    const apireq=()=>{
      fetch('https://sstapi.pythonanywhere.com/api/programs',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          
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
        <div className='w3-row-padding'>
            
            {loading==true && <p style={{color:'white',textAlign:'center',fontSize:34,fontFamily:'Enhanced LED Board-7'}}>loading...</p>}
            {Data.map((i)=>{
                return(
                  <Card className="w-auto dark mb-5" key={i.id}>
                  <CardHeader>
                    <CardTitle className="text-3xl font-medium">{i.name}</CardTitle>
                    <CardDescription className="text-2xl">{i.program_comes_under}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="text-lg">Type: {i.program_type=="g"? "Group":"Individual"}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button onClick={()=>{
                      toast("Heads up!", {
                        description: "If you're here for registering for the events do login",
                        action: {
                          label: "Login using Etlab",
                          onClick: () => console.log("Login"),
                        },
                      })
                    }}>Register</Button>
                  </CardFooter>
                </Card>
                )
            })}
          </div>
    );
}