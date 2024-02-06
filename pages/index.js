import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BottomNavBarComponent from '../components/BottomNavBarComponent';
import { useRouter } from 'next/router';
import TextMorpher from '../components/MorphCompoment';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TopNavBarComponent from '../components/TopNavBarComponent';
import LoginComponent from '@/components/LoginComponent';
export default function Home() {
  const router=useRouter();
 // testing out some animation 
  let animator=null;
  

  return (
    <div className="main">
      <TopNavBarComponent/>
      <BottomNavBarComponent/>
      <Head>
         <meta name='theme-color' color='#0000'/>
         <meta name='description' content='Sargam, Chitram, Thaalam. Art fest of SCTCE'/>
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
        <motion.img src='https://i.ibb.co/84bZG35/sst-24-label.png' 
            style={{height:200,width:'auto',objectFit:'cover'}}
            initial={{opacity:0,transform:'translateY(50px)',}}
            whileInView={{opacity:1,transform:'translateY(0px)'}}
            transition={{ ease:'linear', duration: 2 }}
        />
      </motion.div>
      <motion.div
         initial={{opacity:0}}
         whileInView={{opacity:1}}
         transition={{ ease:'easeIn', duration: 1 }}
      >
        <div className={styles.contactFlexBox}>
            <div className={styles.shortContactViewer}>
                <h1 className={styles.contactmeFont} >This February</h1>
                <div>
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
                <LoginComponent/>
            </div>
            <div className={styles.rightContactImage}>
                <Image className={styles.contactImg} src="https://sreedbackend.pythonanywhere.com/media/postpics/sreedhar.png" width={550} height={600} style={{borderRadius:35}}/>
            </div>
        </div>
      </motion.div>
      
      
      </div>
      </div>
  )
}
