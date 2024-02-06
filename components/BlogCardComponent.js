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

import Dialogue from "./DialogueComponent";

import { toast } from "sonner"
import { Dialog } from "@radix-ui/react-dialog";


 
export default function BlogCardComponent({option}){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [registerLoading,setRegisterLoading]=useState(false);
    const [profile, setProfile] = useState([])
    
    const [id,setID]=useState(0);
    const token = localStorage.getItem("token");
    const router =useRouter();
    const apireqProfile=()=>{
      setLoading(true);
      fetch('https://sstapi.pythonanywhere.com/accounts/api/profile/',{
          method:'GET',
          headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization': `Token ${token}`
          
          },
      })
      .then(response=>response.json())
      .then(resdata=>{
          setProfile(resdata.data);
          setLoading(false);
      })
      .catch(e=>{console.log(e)})
  }
    const apireq=()=>{
      fetch(`https://sstapi.pythonanywhere.com/api/programs/${option}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        },
      })
      .then(response=>response.json())
      .then(data=>{
        setData(data.data);
        setLoading(false);
        
        
      })
      .catch(e=>{console.log(e)})
    }
    const register=()=>{
      setRegisterLoading(true);
      let toast_msg='';
      fetch(`https://sstapi.pythonanywhere.com/api/register/${id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`  
        },
      })
      .then(response=>response.json())
      .then(data=>{
        setRegisterLoading(false);
        if(data.data)
          toast_msg=data.data;
        else if(data.error)
          toast_msg=data.error 
        toast(toast_msg, {
          description: "tip :you can see your registerations in profile",
          action: {
            label: "Close",
            onClick:()=>{console.log('close')}
          },
        })
        
      })
      .catch(e=>{console.log(e)})
    }
    useEffect(()=>{
      apireqProfile();
      apireq();
    },[])
 
    return(
        <div className='w3-row-padding'>
            
            {loading==true && <p style={{color:'white',textAlign:'center',fontSize:34,fontFamily:'Enhanced LED Board-7'}}>loading...</p>}
            
            {Data.map((i)=>{
                if(i.program_gender_type==profile.gender || i.program_gender_type=='all'){
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
                        <Button  disabled={(registerLoading==true || i.is_registered==true )? true : false} onClick={()=>{
                          if(i.program_type=='g'){
                            toast("Heads up!", {
                              description: "Group events registeration not opened yet !",
                              action: {
                                label: "Close",
                                onClick:()=>{console.log("close")}
                              },
                            })
                          }else{
                            setID(i.id);
                            if(id!=0)
                    
                              register();
                          }
                        }}>{i.is_registered==true ? 'Registered':'Register'}</Button>
                      </CardFooter>
                  </Card>
                  )
                }
            })}
          </div>
    );
}