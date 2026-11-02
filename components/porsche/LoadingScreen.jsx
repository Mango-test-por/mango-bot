import Image from 'next/image';
import styles from '../../styles/LoadingScreen.module.css';

export default function LoadingScreen({ isVisible }) {
  return (
    <div className={`${styles.screen}${isVisible ? ` ${styles.visible}` : ''}`} role="status" aria-live="polite" aria-atomic="true" aria-hidden={!isVisible}>
      <div className={styles.content}>
        <Image className={styles.logo} src="/porsche-wordmark.svg" alt="Porsche" width={300} height={20} priority unoptimized />
        <div className={styles.track} aria-hidden="true"><span className={styles.indicator} /></div>
        <p className={styles.label}>Loading your experience</p>
      </div>
    </div>
  );
}
