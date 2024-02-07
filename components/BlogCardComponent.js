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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
 
import { toast } from "sonner"
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

export default function BlogCardComponent({option}){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [registerLoading,setRegisterLoading]=useState(false);
    const [profile, setProfile] = useState([])
    const [showDialog,setShowDialog] = useState(false);
    const [id,setID]=useState(0);
    const [members,setMembers] = useState({});
    const [drawerloading,setDrawerLoading] = useState(true);
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
        apireq();
      })
      .catch(e=>{console.log(e)})
    }
    const createTeam=()=>{
      setRegisterLoading(true);
      let toast_msg='';
      fetch(`https://sstapi.pythonanywhere.com/api/team/create/${id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`  
        },
      })
      .then(response=>response.json())
      .then(data=>{
        setRegisterLoading(false);
        if(data.data){
          toast_msg=data.data;
          setShowDialog(true);
        }else if(data.error)
          toast_msg=data.error 
        toast(toast_msg, {
          description: "tip :you can see your registerations in profile",
          action: {
            label: "Close",
            onClick:()=>{console.log('close')}
          },
        })
        apireq();
      })
      .catch(e=>{console.log(e)})
    }
    const getTeam=()=>{
      setDrawerLoading(true);
      let toast_msg='';
      fetch(`https://sstapi.pythonanywhere.com/api/team/members/${profile.username}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`  
        },
      })
      .then(response=>response.json())
      .then(data=>{
        setDrawerLoading(false);
        if(data.data){
          setMembers(data.data)
        }else if(data.error){
          toast_msg=data.error 
          toast(toast_msg, {
            description: "error/bug: try contacting admins",
            action: {
              label: "Close",
              onClick:()=>{console.log('close')}
            },
          })
        }

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
            <Dialog open={showDialog==true ? true :false} onOpenChange={()=>{setShowDialog(false)}}>
            <DialogContent>
            <DialogHeader>
              <DialogTitle>Your team code</DialogTitle>
              <DialogDescription>
                You can copy/paste and share this code with your team members to join your team
              </DialogDescription>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text"  value={`https://sctarts.in/e/${profile.username}`}/>
                <Button type="submit" onClick={()=>{
                  window.open(`whatsapp://send?text=Hi, link to join my team is https://sctarts.in/e/${profile.username} do not share with outside team members`);
                }}>Share</Button>
              </div>
             
            </DialogHeader>
            </DialogContent>
            </Dialog>
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
                            setID(i.id);                           
                            if(id!=0)
                            createTeam();
                          }else{
                            setID(i.id);
                            if(id!=0)
                    
                              register();
                          }
                        }}>{i.is_registered==true ? 'Registered':'Register'}</Button>
                        {/* {i.program_type=='g' && i.is_registered==true && 
                            <Drawer>
                              <DrawerTrigger>
                                <Button 
                                variant={"outline"}
                                onClick={
                                  ()=>{
                                    getTeam();
                                  }
                                }
                                >View team</Button>
                              </DrawerTrigger>
                              <DrawerContent className="dark text-white h-[300px]">
                                {drawerloading==true ? <h1 className="text-2xl text-center">loading...</h1> :(
                                  <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                      <DrawerTitle>{members.program}</DrawerTitle>
                                      <DrawerDescription>Lead {members.team_lead}</DrawerDescription>
                                    </DrawerHeader>
                                    <Skeleton>
                                      {members.members.length==0 && 
                                      <Card className="w-auto dark mb-5" >
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-medium">No members in your team</CardTitle>
                                        </CardHeader>
                                      </Card>
                                      }
                                      {members.members.map((i)=>{
                                        <Card className="w-auto dark mb-5" key={i}>
                                          <CardHeader>
                                              <CardTitle className="text-3xl font-medium">{i}</CardTitle>
                                          </CardHeader>
                                        </Card>
                                      })}
                                    </Skeleton>
                                  </div>
                                )}
                              <DrawerFooter>
                                  <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                  </DrawerClose>
                                </DrawerFooter>
                              </DrawerContent>
                          </Drawer>
                        } */}
                      </CardFooter>
                  </Card>
                  )
                }
            })}
          </div>
    );
}