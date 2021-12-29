import { FC } from 'react'
import Button from './components/Button'
import useMediaRecorder from './hooks/useMediaRecorder'

import styles from './styles/styles.module.css'

const statusMessage = (status: string): string => status === 'idle' ? 'Grabar' : 'Detener'
const ButtonRecColor = (status: string): string => status === 'idle' ? 'primary' : 'warning'

const App: FC<{}> = () => {
  const { status, toggleRecorder } = useMediaRecorder()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Screen Recorder</h1>
      <Button
        onClick={toggleRecorder}
        variant={ButtonRecColor(status)}
      >
        {statusMessage(status)}
      </Button>
      <footer className={styles.footer}>
        <a
          className={styles.link}
          href='https://github.com/munozrc'
          target='_blank'
          rel='noreferrer'
        >
          by <strong className={styles.name}>@munozrc</strong>
        </a>
      </footer>
    </div>
  )
}

export default App
