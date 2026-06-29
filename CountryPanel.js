import styles from '../styles/CountryPanel.module.css';

export default function CountryPanel({ liveText, country, emoji, description, linkText, linkHref = '#' }) {
  return (
    <div className={styles.panel}>
      <div className={styles.live}>
        <span>{liveText}</span>
      </div>
      <div className={styles.countryInfo}>
        <span className={styles.emoji}>{emoji}</span>
        <h2 className={styles.countryName}>{country}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <a href={linkHref} className={styles.shopLink}>
        {linkText}
      </a>
    </div>
  );
}