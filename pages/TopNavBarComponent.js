import styles from '../styles/TopNavBarComponent.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
export default function TopNavBarComponent(){
    const router = useRouter();
    
    return(
        <div>
        <Head>
           <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        </Head>
        <header className={styles.header}>
            <nav className='w3-top w3-bar w3-black'>
                
                <div className={router.asPath=='/' ? 'w3-text-white  w3-bar-item ' :'w3-text-grey  w3-bar-item w3-button '} style={{marginRight:15,fontSize:20}}><Link href="/">home</Link></div>
                <div className={router.asPath=='/about' ? 'w3-text-white  w3-bar-item' :'w3-text-grey  w3-bar-item'}  style={{marginRight:15,fontSize:20}}><Link href="/about">about</Link></div>
                <div className={router.pathname=='/blog/all' ? 'w3-text-white  w3-bar-item' :'w3-text-grey  w3-bar-item'} style={{marginRight:15,fontSize:20}}><Link href="/blog/all">blog</Link></div>
               
            </nav>
        </header>
        </div>
    );
}