
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
        <header className="header">
            <nav className='w3-top w3-bar nav'>
                
                <div className={router.asPath=='/' ? 'w3-text-white  w3-bar-item navitem navitemAll navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'} ><Link href="/">home</Link></div>
                <div className={router.asPath=='/about' ? 'w3-text-white  w3-bar-item navitem navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'} ><Link href="/about">about</Link></div>
                <div className={router.pathname=='/blog/all' ? 'w3-text-white  w3-bar-item navitem navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'}><Link href="/blog/all">blog</Link></div>
               
            </nav>
        </header>
        </div>
    );
}