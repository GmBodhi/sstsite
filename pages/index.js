import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TopNavBarComponent from './TopNavBarComponent';
import { useRouter } from 'next/router';
import BlogCardComponent from './BlogCardComponent';
import HorizontalScrollComponent from './HorizontalScrollComponent';
import TextMorpher from './MorphCompoment';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
export default function Home() {
  const router=useRouter();
 // testing out some animation 
  let animator=null;

  useEffect(()=>{
    animator = new IntersectionObserver((elements)=>{
      elements.forEach((items)=>{
        if(items.isIntersecting){
          items.target.childNodes.forEach((nodes)=>{
            console.log(nodes);
          })
          console.log(items.target.children);
          items.target.classList.add("show");
          items.target.classList.add("showtext");
  
        }else{
          items.target.classList.remove("show");
          items.target.classList.remove("showtext");
  
        }
      })
    })
  let get_items = document.querySelectorAll(".hidden");
  get_items.forEach((i)=>{
    animator.observe(i);
  });
  },[])

  return (
    <div className="main">
      <TopNavBarComponent/>
      <Head>
         <meta name='theme-color' color='#0000'/>
         <meta name='description' content='Sreedhar k.s, portfolio and blog,sreedhar k.s blog, sreedhar,'/>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
         <title>സർഗം ചിത്രം താളം</title>
      </Head>
      <div className={styles.mainContents}> 
      <motion.div className={styles.largeViewer}
       initial={{opacity:0,transform:'translateZ(-120px)'}}
       whileInView={{opacity:1,transform:'translateZ(0px)'}}
       transition={{ ease:'easeIn', duration: 2}}
      >
        <motion.div style={{margin:5}}
          initial={{opacity:0,transform:'scaleY(0.98)',}}
          whileInView={{opacity:1,transform:'scaleY(1)'}}
          transition={{ ease:'easeIn', duration: 0 }}
        >
          <TextMorpher/>
        </motion.div>
      </motion.div>
      <div className='hidden'>
        <div className={styles.contactFlexBox}>
            <div className={styles.shortContactViewer}>
                <h1 className={styles.contactmeFont} >This February</h1>
                <div className='hidden'>
                  <div className={styles.contactContainer}>
                      <div className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>16</h2>
                      </div>
                      <div  className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>17</h2>
                      </div>
                      <div  className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>18</h2>
                      </div>
                      
                  </div>
                </div>
                <p style={{fontSize:20,fontWeight:600}}>Register using Etlab</p>

          
            </div>
            <div className={styles.rightContactImage}>
                <Image className={styles.contactImg} src="https://sreedbackend.pythonanywhere.com/media/postpics/sreedhar.png" width={550} height={600} style={{borderRadius:35}}/>
            </div>
        </div>
      </div>
      
      
      </div>
      </div>
  )
}
