import BlogCardComponent from "../BlogCardComponent";
import Head from "next/head";
import TopNavBarComponent from "../TopNavBarComponent";
export default function All(){
    return(
        <div >
            <TopNavBarComponent/>
            <Head>
                <meta name='theme-color' color='black'/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            <div className="blogContainer">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55,marginLeft:10}}>Blog</h1>
                <BlogCardComponent/>
            </div>

        </div>
    );
}