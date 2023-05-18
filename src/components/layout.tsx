import styles from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}></main>
      <aside className={styles.aside}>
        <div className={styles.header}>
          <h2 className={styles.title}>Need some help?</h2>
        </div>
        <div className={styles.asideContent}>{props.children}</div>
      </aside>
    </div>
  );
}
