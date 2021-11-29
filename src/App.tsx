import { FC } from 'react'
import useMediaRecorder from './hooks/useMediaRecorder'

const App: FC<{}> = () => {
  const { startRecording } = useMediaRecorder()

  return (
    <div>
      <h1>Screen Recorder</h1>
      <button onClick={startRecording} className='btn-recording'>Start</button>
    </div>
  )
}

export default App
