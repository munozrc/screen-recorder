import { FC } from 'react'
import Button from './components/Button'
import useMediaRecorder from './hooks/useMediaRecorder'

const statusMessage = (status: string): string => status === 'idle' ? 'Grabar' : 'Detener'
const ButtonRecColor = (status: string): string => status === 'idle' ? 'primary' : 'warning'

const App: FC<{}> = () => {
  const { status, startRecording } = useMediaRecorder()

  return (
    <div className='wrapper'>
      <h1>Screen Recorder</h1>
      <Button
        onClick={startRecording}
        variant={ButtonRecColor(status)}
      >
        {statusMessage(status)}
      </Button>
      <footer>
        <a
          href='https://github.com/munozrc'
          target='_blank'
          rel='noreferrer'
        >
          by <strong>@munozrc</strong>
        </a>
      </footer>
    </div>
  )
}

export default App
