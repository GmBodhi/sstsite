import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '../../styles/Blog.module.css'
export default function Blog(){
    const get_id = useRouter();
    let _id=get_id.query.id;
    let _tag=get_id.query._tag;
    const [Data,setData]=useState({});
    const [routerReady,setRouterReady]=useState(false);
    const [loading,setLoading]=useState(true);
    const apireq=()=>{
        
        fetch('https://sreedbackend.pythonanywhere.com/graphql',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({query:`{nodeBlog(id:${_id}){id,title,content,pic,tag}}`})
        })
        .then(response=>response.json())
        .then(data=>{
            if(get_id.isReady==true){
                setRouterReady(true);
                setData(data.data.nodeBlog);
                setLoading(false);
               }
               
            
            
        })
        .catch(e=>{console.log(e)})

    }
    useEffect(()=>{
        if(routerReady!=true){
            apireq();
            
        }  

    },[])

    return(
        <div className="main">
            {loading==true? <p className={styles.loading}>loading...</p>:(
            <div key={Data.id} style={{width:'100%'}} className={styles.blogContainer}>
                <button  style={{color:'lightblue',backgroundColor:'black',fontSize:19,borderColor:'black',borderWidth:1}} onClick={()=>{get_id.back()}}>close</button>
                <div className={styles.flexContainer}>
                    <h1 style={{color:'white',fontSize:55,marginLeft:25}}>{Data.title}</h1>
                    <div key={Data.id}>
                    <img className={styles.blogImage} src={`https://sreedbackend.pythonanywhere.com/${Data.pic}`}/>
                    </div>
                    <p className={styles.content} >{Data.content}</p>
                </div>
            </div>
            )}
            
        </div>
    )
}