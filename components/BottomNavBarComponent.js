
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion';
import {PersonIcon} from '@radix-ui/react-icons'
export default function BottomNavBarComponent(){
    const router = useRouter();
    
    return(
        <div>
        <Head>
           <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        </Head>
        <header className="header">
            <motion.nav className='w3-bottom w3-bar nav'
                   initial={{opacity:0,transform:'translateY(20px)',
                            borderTopLeftRadius:0,borderTopRightRadius:0}}
                   whileInView={{opacity:1,transform:'translateY(0px)',
                                 borderTopLeftRadius:25,borderTopRightRadius:25}}
                   transition={{ ease:'linear', duration: 0.5}}
            >
                <div className={router.asPath=='/' ? 'w3-text-white  w3-bar-item navitem navitemAll navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'} ><Link href="/">home</Link></div>
                {/* <div className={router.asPath=='/points' ? 'w3-text-white  w3-bar-item navitem navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'} ><Link href="/points">points</Link></div> */}
                <div className={router.pathname=='/e/all' ? 'w3-text-white  w3-bar-item navitem navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'}><Link href="/e/all">events</Link></div>
                <div className={router.pathname=='/profile' ? 'w3-text-white  w3-bar-item navitem navtext' :'w3-text-grey  w3-bar-item navitemAll navtext'}><Link href="/profile"><PersonIcon height={20} width={20}/></Link></div>

            </motion.nav>
        </header>
        </div>
    );
}