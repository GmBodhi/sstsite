
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
            <nav className='w3-top w3-bar topnav'>
                <div className={'w3-text-grey  w3-bar-item navitemAll navtext'}>
                    <img src='https://i.ibb.co/PMDzyY1/student-union.png' 
                    style={{height:50,width:50,filter: 'brightness(0) invert(1)'}}/>
                </div>               
            </nav>
        </header>
        </div>
    );
}