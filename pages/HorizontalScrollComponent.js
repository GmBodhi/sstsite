import styles from '../styles/HorizontalScrollComponent.module.css';
import globalstyles from '../styles/Home.module.css';
const contents=[
    {id:2,url:'#',media:'https://i.ibb.co/xYGjRsL/shilpa.jpg'},
    {id:2,url:'#',media:'https://i.ibb.co/dQgQGz3/lost.jpg'},
    {id:3,url:'#',media:'https://i.ibb.co/x8JpWRf/og.jpg'},
]
export default function HorizontalScrollComponent(){
    return(
    <>
       <h1 className={globalstyles.titleFont}>Proshow</h1>
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