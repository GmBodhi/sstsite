
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion';
export default function TopNavBarComponent(){
    const router = useRouter();
    
    return(
        <div>
        <Head>
           <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        </Head>
        <header className="topnavheader">
            <motion.nav className='w3-top w3-bar topnav'
            initial={{opacity:0,transform:'translateY(-20px)'}}
            whileInView={{opacity:1,transform:'translateY(0px)'}}
            transition={{ ease:'linear', duration: 0.6}}
            >
                <div className={'w3-text-grey  w3-bar-item navitemAll navtext'} style={{display:'flex',flexDirection:'row'}}>
                    <img src='https://i.ibb.co/PMDzyY1/student-union.png' 
                    style={{height:50,width:50,filter: 'brightness(0) invert(1)'}}/>
                    <div style={{borderLeft:'1px solid  hsla(0,0%,100%,.155)',height:50,marginLeft:5,marginRight:5}}></div>
                    <img src='https://i.ibb.co/GxLprT1/sctce-logo.png' 
                    style={{height:50,width:150,filter: 'brightness(0) invert(1)',objectFit:'cover'}}/>
                </div>               
            </motion.nav>
        </header>
        </div>
    );
}