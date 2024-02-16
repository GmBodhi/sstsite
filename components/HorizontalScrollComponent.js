import styles from '../styles/HorizontalScrollComponent.module.css';
import globalstyles from '../styles/Home.module.css';
import Image from 'next/image';

const contents = [
    { id: 1, url: '#', media: 'https://i.ibb.co/xYGjRsL/shilpa.jpg' },
    { id: 2, url: '#', media: 'https://i.ibb.co/dQgQGz3/lost.jpg' },
    { id: 3, url: '#', media: 'https://i.ibb.co/x8JpWRf/og.jpg' },
];

export default function HorizontalScrollComponent() {
    return (
        <>
            <h1 className={globalstyles.titleFont}>Proshow</h1>
            <div className={styles.Hcontainer}>
                {contents.map((i) => {
                    return (
                        <>
                            <a href={i.url} target={'_blank'} rel="noopener noreferrer">
                                <Image className={styles.card} width="auto" key={i.id} src={i.media} alt="" />
                            </a>
                        </>
                    );
                })}
            </div>
        </>
    );
}
