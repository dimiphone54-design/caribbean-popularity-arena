import Link from 'next/link';
import styles from '../../styles/Upload.module.css'; // Re-using some styles

export default function UKShopPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🇬🇧 United Kingdom Shop</h1>
      </div>
      <p className={styles.welcomeMessage}>
        Welcome to the UK Shop page. Content for dropship creators will be displayed here.
      </p>
      <Link href="/browse">
        <a>← Back to Browse</a>
      </Link>
    </div>
  );
}