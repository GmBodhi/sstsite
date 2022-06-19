import TopNavBarComponent from "./TopNavBarComponent";
import styles from '../styles/About.module.css';
export default function About(){
    return(
        <div className="main">
            <TopNavBarComponent/>
            <div className={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
               <h1 className={styles.aboutTitle}>About me.</h1>
               <p className={styles.aboutFont}>I'm  an under graduate in Computer Science & Engineering from SCT college of Engineering Trivandrum.I completed by schoolings from SDV central School,Alappuzha and Carmel International School</p>
               <h1 className={styles.aboutTitle}>My Journey.</h1>
               <p className={styles.aboutFont}>I started coding at the age of 13 by building static sites using html,css&javascript and then moved on with basic programming.Now I'm a full stack developer who loves to solve problems and help humanity.I loves to experiment new technologies,moreover that I loves comptetive programming and weekly tries out problems from Hackerank.com</p>
               <h1 className={styles.aboutTitle}>My tech stack.</h1>
               <p className={styles.aboutFont}>These are my most used libraries or framework while building a software</p>
               <ul style={{color:'white',fontSize:23}}>
                <li>Django</li>
                <li>React</li>
                <li>React Native</li>
                <li>Svelte</li>
                <li>Nextjs</li>
               </ul>
               <h1 className={styles.aboutTitle}>Programming Languages.</h1>
               <p className={styles.aboutFont}>I'm fluent in these languages.</p>
               <ul style={{color:'white',fontSize:23}}>
                <li>Python</li>
                <li>Javascript</li>
                <li>C/C++</li>
                <li>Java</li>
                <li>MySql</li>
                <li>Html,CSS (i know it's a markup language !)</li>
               </ul>
               <h1 className={styles.aboutTitle}>Photos.</h1>
            </div>
        </div>
    );
}