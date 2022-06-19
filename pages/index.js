import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TopNavBarComponent from './TopNavBarComponent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export default function Home() {
  const router=useRouter();
  const imgdata=[{id:1,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'},{id:2,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'},{id:2,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'}];
  const [Data,setData]=useState([]);
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
      
      
    })
    .catch(e=>{console.log(e)})
  }
  useEffect(()=>{
    apireq();
  },[])
  return (
    <div className={styles.main}>
      <TopNavBarComponent/>
      <Head>
         <meta name='theme-color' color='black'/>
      </Head>
      <div className={styles.largeViewer}>
        <div style={{margin:5}}>
        <h1 className={styles.titleFont} style={{textAlign:'left'}}>Hi,It's sreedhar</h1>
        <p style={{color:'white',textAlign:'left',fontSize:20,fontWeight:400}}>19 year old,Engineering student from kerala!. This site is all about my projects and blogs scroll down to see more...</p>
        </div>
      </div>
  
      <div className={styles.shortContactViewer}>
          <h1 className={[styles.titleFont,styles.textColorBlack]} >Contact me</h1>
          <div className={styles.contactContainer}>
              <div className={styles.contactIndividuals}>
              <a href='https://www.github.com/mellofordev/'><img src='https://cdn3.iconfinder.com/data/icons/inficons/512/github.png' style={{height:50,width:50,borderRadius:15}}/></a>
              </div>
              <div  className={styles.contactIndividuals}>
              <a href='https://www.instagram.com/sreedhar_k.s/'><img src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png' style={{height:50,width:50,borderRadius:15}}/></a>
              
              </div>
              <div  className={styles.contactIndividuals}>
              <a href='https://www.twitter.com/boywithacap/'><img src='https://cdn3.iconfinder.com/data/icons/inficons/512/twitter.png' style={{height:50,width:50,borderRadius:15}}/></a>
              </div>
              
           </div>
           <p style={{fontSize:20,fontWeight:600}}>hello@sreed.me</p>

    
      </div>
      <div className={styles.shortViewer}>
        <h1 className={styles.titleFont}>My projects</h1>
        <div style={{flexDirection:'column',margin:15,marginInline:10}}>
            
            {imgdata.map((i)=>{
              return(
                <div style={{overflowY:'hidden',overflowX:'scroll',whiteSpace:'nowrap'}}>
                <img key={i.id} src={i.pic} style={{height:250,width:350,marginBottom:10,marginRight:5,borderRadius:15,flexDirection:'row'}} />
                </div>
              );
            })}
        </div>
       
        <div style={{margin:20}}>
           <h1 className={styles.titleFont}>Awards</h1>
           <div className={styles.awardsContainer}>
              <img src='https://media.badgr.com/uploads/badges/assertion-yPMh9dMtS8Kan4Zmy4ZALw.png' style={{borderRadius:15,height:140,width:140}}/>
              <img src='https://api.badgr.io/public/assertions/Mg64QqtzRmiOSjB906LZCA/image' style={{borderRadius:15,height:155,width:155}}/>
           </div>
        </div>
        <div className='w3-row-padding'>
          <h3 className={styles.titleFont}>Blog</h3>
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
        <div>
          
        </div>
        <div className='w3-row-padding-16  w3-center' style={{backgroundColor:'#242526'}}>
          <p className='w3-text-white'>Sreedhar k.s</p>
          <p className='w3-text-white'>Find out my portfolio source code in github ✨</p>
        </div>
      </div>
    
    </div>
  )
}
