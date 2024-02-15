import '../styles/globals.css';
import { Toaster } from '@/components/ui/sonner';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <meta name="theme-color" color="#0000" />
            <meta name="description" content="Sargam, Chitram, Thaalam. Art fest of SCTCE" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <Component {...pageProps} />
            <Toaster />
        </>
    );
}

export default MyApp;
