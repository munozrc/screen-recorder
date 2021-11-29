import { FC } from 'react'
import Button from './components/Button'
import useMediaRecorder from './hooks/useMediaRecorder'

const App: FC<{}> = () => {
  const { startRecording } = useMediaRecorder()

  return (
    <div>
      <h1>Screen Recorder</h1>
      <Button onClick={startRecording}>Grabar</Button>
    </div>
  )
}

export default App
