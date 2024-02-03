import styles from '../styles/MorphComponent.module.scss';
export default function TextMorpher(){
    return(
        <div className={styles.morphing}>
            <div className={styles.word}>സർഗം</div>
            <div className={styles.word}>ചിത്രം</div>
            <div className={styles.word}>താളം</div>

        </div>

    );
}