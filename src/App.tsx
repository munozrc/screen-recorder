import { FC } from 'react'
import Button from './components/Button'
import useMediaRecorder from './hooks/useMediaRecorder'

import styles from './styles/styles.module.css'

const STATUS_MESSAGES = {
  idle: 'Grabar',
  recording: 'Detener',
  stopping: 'Descargando...'
}

const STYLES_BUTTON_RECORDER = {
  idle: 'primary',
  recording: 'warning',
  stopping: 'primary'
}

const App: FC<{}> = () => {
  const { status, toggleRecorder } = useMediaRecorder()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Screen Recorder</h1>
      <Button
        onClick={toggleRecorder}
        variant={STYLES_BUTTON_RECORDER[status] ?? 'primary'}
      >
        {STATUS_MESSAGES[status] ?? 'Grabar'}
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
