import GoogleAuthButton from "./components/GoogleAuthButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <GoogleAuthButton />
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
      </div>
    </main>
  );
}
