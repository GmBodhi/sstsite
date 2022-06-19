import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TopNavBarComponent from './TopNavBarComponent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlogCardComponent from './BlogCardComponent';
export default function Home() {
  const router=useRouter();
  const imgdata=[{id:1,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'},{id:2,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'},{id:2,pic:'https://static.vecteezy.com/system/resources/previews/000/247/824/original/vector-beautiful-landscape-illustration.jpg'}];

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
                <div key={i.id} style={{overflowY:'hidden',overflowX:'scroll',whiteSpace:'nowrap'}}>
                <img  src={i.pic} style={{height:250,width:350,marginBottom:10,marginRight:5,borderRadius:15,flexDirection:'row'}} />
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
        <div>
          <h3 className={styles.titleFont}>Blog</h3>
          <BlogCardComponent/>
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
