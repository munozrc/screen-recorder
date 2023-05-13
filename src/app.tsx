import styles from "@/styles/app.module.css"

export default function App() {
  return (
    <>
      <main className={styles.container}>
        <h1 className={styles.title}>Screen Recorder</h1>
        <button className={styles.button}>Grabar</button>
      </main>
    </>
  )
}
