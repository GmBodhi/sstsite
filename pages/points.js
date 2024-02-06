import BottomNavBarComponent from '../components/BottomNavBarComponent';
import styles from '../styles/About.module.css';

export default function About(){
    return(
        <div className="main">
            <BottomNavBarComponent/>
            <div className={styles.mainAbout}>
               <h1 className={styles.aboutTitle}>Points.</h1>
               <p className={styles.aboutFont}>Hang on , points table are on the way </p>
               <img src='https://c.tenor.com/9SHzPU5UTn8AAAAC/tenor.gif'/>
            </div>
            
        </div>
    );
}