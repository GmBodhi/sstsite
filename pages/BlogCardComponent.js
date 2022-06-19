import { useState,useEffect } from "react";
import { useRouter } from "next/router";
export default function BlogCardComponent(){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const router =useRouter();
    const apireq=()=>{
      fetch('https://sreedbackend.pythonanywhere.com/graphql',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          
        },
        body:JSON.stringify({query:'{blogList{id,title,tag,content,pic}}'})
      })
      .then(response=>response.json())
      .then(data=>{
        
        setData(data.data.blogList);
        setLoading(false);
        
        
      })
      .catch(e=>{console.log(e)})
    }
    useEffect(()=>{
      apireq();
    },[])
    return(
        <div className='w3-row-padding'>
            {loading==true && <p style={{color:'white',textAlign:'center',fontSize:34}}>loading...</p>}
            {Data.map((i)=>{
                return(
            <div key={i.id} className="w3-col l3   w3-margin-bottom w3-blue w3-hover-pink w3-round-xlarge w3-margin-right">
                <img src={`https://sreedbackend.pythonanywhere.com/${i.pic}`} alt="pic" style={{width:'100%',borderRadius:15,objectFit:'cover',marginTop:5}}/>
                <h3>{i.title}</h3>
                <p className="w3-pink w3-round-xlarge w3-center" style={{width:'25%'}}>{i.tag}</p>
                <p>{i.content.slice(0,55)+'...read more'}</p>
                <p><button className="w3-button w3-light-grey w3-block w3-round-xlarge" onClick={()=>{router.push(`/blog/${i.id}/`)}} >Read</button></p>
            </div>
                )
            })}
          </div>
    );
}