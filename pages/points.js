import BottomNavBarComponent from '../components/BottomNavBarComponent';
import styles from '../styles/About.module.css';

export default function About(){
    return(
        <div className="main">
            <BottomNavBarComponent/>
            <div className="m-10 flex flex-col justify-items-center">
                <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55}}>Points</h1>
                <p className="text-white mb-[10px]">Hang on, points table will arrive soon!</p>
               <img src='https://c.tenor.com/9SHzPU5UTn8AAAAC/tenor.gif'/>
            </div>
            
        </div>
    );
}