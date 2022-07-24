import styles from '../styles/HorizontalScrollComponent.module.css';

const contents=['https://i.ibb.co/mStgMbZ/Whats-App-Image-2022-07-24-at-12-51-46-PM.jpg','https://i.ibb.co/W6RWGch/Whats-App-Image-2022-07-24-at-12-51-48-PM.jpg']
export default function HorizontalScrollComponent(){
    return(
        <div className={styles.Hcontainer}>
            {contents.map((i)=>{
                return(
                    <img 
                        className={styles.card}
                        key={i}
                        src={i}
                    />
                )
            })}
        </div>
    );
}