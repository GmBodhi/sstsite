import BlogCardComponent from "../../components/BlogCardComponent";
import Head from "next/head";
import BottomNavBarComponent from "../../components/BottomNavBarComponent";
export default function All(){
    return(
        <div >
            <BottomNavBarComponent/>
            <Head>
                <meta name='theme-color' color='black'/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            <div className="blogContainer">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55,marginLeft:10}}>Events</h1>
                <BlogCardComponent/>
                {/* <p style={{color:'white',textAlign:'center',fontSize:28}}>events coming soon</p> */}
            </div>

        </div>
    );
}