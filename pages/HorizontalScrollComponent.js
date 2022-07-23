import styles from '../styles/HorizontalScrollComponent.module.css';

const contents=['https://venturebeat.com/wp-content/uploads/2021/03/article23-1.jpg?w=1200&strip=all','https://imageio.forbes.com/specials-images/imageserve/62380c71af36178f0f91f59d/0x0.jpg?format=jpg&width=1200','https://243138.fs1.hubspotusercontent-na1.net/hubfs/243138/metaverse-virtual-city-1.jpg']
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