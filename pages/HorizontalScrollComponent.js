import styles from '../styles/HorizontalScrollComponent.module.css';
import globalstyles from '../styles/Home.module.css';
const contents=[
    {id:1,url:'https://dhyuthimetaverse.vercel.app',media:'https://i.ibb.co/4sLMfmn/dhyuthi.jpg'},
    {id:2,url:'https://internshipcell.vercel.app',media:'https://i.ibb.co/hMfjgVG/internship-cell.jpg'},
    {id:3,url:'https://github.com/mellofordev/potatoapi',media:'https://i.ibb.co/fFvGqVW/punfuel-project.jpg'},
    {id:4,url:'https://github.com/mellofordev/swag-',media:'https://i.ibb.co/KVtd3Qg/swag.jpg'}
]
export default function HorizontalScrollComponent(){
    return(
    <>
       <h1 className={globalstyles.titleFont}>Some projects</h1>
        <div className={styles.Hcontainer}>
            
            {contents.map((i)=>{
                return(
                    <>
                      <a href={i.url} target={'_blank'} rel="noopener noreferrer">
                        <img 
                            className={styles.card}
                            key={i.id}
                            src={i.media}
                        />
                    </a>
                    </>
                )
            })}
        </div>
    </>
    );
}