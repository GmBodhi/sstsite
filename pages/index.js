import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
         <meta name='theme-color' color='black'/>
      </Head>
      <div className={styles.largeViewer}>
        <div style={{margin:5}}>
        <h1 className={styles.titleFont}>Hi,It's sreedhar</h1>
        <p style={{color:'white'}}>This is my personal site and blog scroll down to see more...</p>
        </div>
      </div>
      <div className={styles.shortViewer}>
          <h1 className={[styles.titleFont,styles.textColorBlack]} >Contact me</h1>
          <div className={styles.contactContainer}>
              <div className={styles.contactIndividuals}>
              <a href='https://www.github.com/mellofordev/'><img src='https://cdn3.iconfinder.com/data/icons/inficons/512/github.png' style={{height:50,width:50,borderRadius:15}}/></a>
              </div>
              <div  className={styles.contactIndividuals}>
              <a href='https://www.github.com/mellofordev/'><img src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png' style={{height:50,width:50,borderRadius:15}}/></a>
              
              </div>
              <div  className={styles.contactIndividuals}>
              <a href='https://www.github.com/mellofordev/'><img src='https://cdn3.iconfinder.com/data/icons/inficons/512/twitter.png' style={{height:50,width:50,borderRadius:15}}/></a>
              </div>
              
           </div>
           <p style={{fontSize:20,fontWeight:600}}>hello@sreed.me</p>
      </div>
      <div className={styles.largeViewer}>
        <h1 className={styles.titleFont}>My projects</h1>
      </div>
    </div>
  )
}
