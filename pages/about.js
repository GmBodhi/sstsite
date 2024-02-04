import BottomNavBarComponent from './BottomNavBarComponent';
import styles from '../styles/About.module.css';
export default function About(){
    return(
        <div className="main">
            <BottomNavBarComponent/>
            <div className={styles.mainAbout}>
               <h1 className={styles.aboutTitle}>About me.</h1>
               <p className={styles.aboutFont}>I am a second year undergraduate studying Computer Science  Engineering at SCT College of Engineering Trivandrum. I completed my schooling at SDV Central School in Alappuzha and Carmel International School. </p>
               <h1 className={styles.aboutTitle}>My Journey.</h1>
               <p className={styles.aboutFont}>My journey in the field of computer science began during my school years when I first learned about coding and built a few websites as a hobby. As I became more proficient in programming, I discovered a passion for developing apps and tools that could simplify my tasks and make my work more efficient.</p>
               <p  className={styles.aboutFont}>I also became highly interested in open-source development, which led me to contribute to various open-source projects and collaborate with other developers in the community. Along the way, I gained valuable experience in software development and project management, which helped me to become a more effective team member and leader.</p>
               <p  className={styles.aboutFont}>Today, as a full stack developer, I continue to work on various projects that interest me and help me to grow my skills in programming and design. I am particularly excited about my work on several metaverse projects, which have allowed me to explore new frontiers in virtual reality and immersive experiences.</p>
               <p  className={styles.aboutFont}>Overall, my journey in computer science has been a challenging yet rewarding experience, and I look forward to continuing to learn, grow, and contribute to the field in meaningful ways.</p>
               <h1 className={styles.aboutTitle}>My tech stack.</h1>
               <p className={styles.aboutFont}>These are my most used libraries or framework while building a software</p>
               <ul className={styles.listabout} style={{color:'white',fontSize:23}}>
                <li>Django</li>
                <li>React</li>
                <li>React Native</li>
                <li>Svelte</li>
                <li>Nextjs</li>
               </ul>
               <h1 className={styles.aboutTitle}>Programming Languages.</h1>
               <p className={styles.aboutFont}>I'm fluent in these languages.</p>
               <ul className={styles.listabout} style={{color:'white',fontSize:23}}>
                <li>Python</li>
                <li>Javascript</li>
                <li>C/C++</li>
                <li>Java</li>
                <li>MySql</li>
                <li>Html,CSS (i know it's a markup language !)</li>
               </ul>
               <h1 className={styles.aboutTitle}>Photos.</h1>
               <img src={"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb"} style={{borderRadius:50,height:300,width:'100%',margin:15}}/>
            </div>
        </div>
    );
}