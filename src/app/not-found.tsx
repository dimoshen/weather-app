import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles["not-found"]}>
      <div className={styles["not-found__container"]}>
        <h1 className={styles["not-found__title"]}>404</h1>
        <p className={styles["not-found__text"]}>Page not found 🌧️</p>
        <Link href="/" className={styles["not-found__button"]}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
