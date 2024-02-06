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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { toast } from "sonner"


 
export default function BlogCardComponent({option}){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [registerLoading,setRegisterLoading]=useState(false);
    
    const [id,setID]=useState(0);
    const token = localStorage.getItem("token");
    const router =useRouter();
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
                      <Dialog>
                        <DialogTrigger>
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
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Register
                                </Button>
                              </DialogClose>
                            </DialogFooter>

                        </DialogContent>
                      </Dialog>

                    </CardFooter>
                </Card>
                )
            })}
          </div>
    );
}