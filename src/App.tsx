import { FC } from 'react'
import Button from './components/Button'
import useMediaRecorder from './hooks/useMediaRecorder'

const App: FC<{}> = () => {
  const { startRecording } = useMediaRecorder()

  return (
    <div className='wrapper'>
      <h1>Screen Recorder</h1>
      <Button onClick={startRecording}>Grabar</Button>
      <footer>
        <a>by <strong>@munozrc</strong></a>
      </footer>
    </div>
  )
}

export default App
