import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Blog(){
    const get_id = useRouter();
    let _id=get_id.query.id;
    let _tag=get_id.query._tag;
    const [Data,setData]=useState({});
    const [routerReady,setRouterReady]=useState(false);
    const apireq=()=>{
        console.log(_id);
        fetch('https://sreedbackend.pythonanywhere.com/graphql',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({query:`{nodeBlog(id:${_id}){id,title,content,pic,tag}}`})
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data.data.nodeBlog);
            console.log(Data);
        })
        .catch(e=>{console.log(e)})

    }
    useEffect(()=>{
       if(get_id.isReady==true){
        setRouterReady(true);
       }
       
    },[get_id.isReady])
    if(routerReady==true){
        apireq();
    }
    return(
        <div className="main">
            
            <div key={Data.id} style={{width:'100%'}}>
                <button  style={{color:'lightblue',backgroundColor:'black',fontSize:19,borderColor:'black',borderWidth:1}} onClick={()=>{get_id.back()}}>close</button>
                <h1 style={{color:'white',fontSize:55,marginLeft:25}}>{Data.title}</h1>
                <div>
                  <img style={{margin:24,borderRadius:15,width:'90%',height:'100%'}} src={`https://sreedbackend.pythonanywhere.com/${Data.pic}`}/>
                </div>
                <p style={{color:'white',fontSize:25,margin:24,textAlign:'left',fontStretch:'expanded'}} >{Data.content}</p>
            </div>
        </div>
    )
}