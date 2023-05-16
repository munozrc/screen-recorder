import { useCallback, useRef, useState } from "react"
import { createMediaRecorder, downloadRecording as downloadService, saveRecording, selectDisplayMedia } from "@/lib"
import type { RecordingSetup, Status } from "@/types"
import { InitialRecordingSetup } from "@/constants"

interface ReturnType {
  status: Status
  preview?: MediaStream
  playback?: string
  startRecording: (nameRecording: string) => Promise<void>
  downloadRecording: () => Promise<void>
  stopRecording: () => Promise<void>
}

export function useRecorder (): ReturnType {
  const [status, setStatus] = useState<Status>("IDLE")
  const [recordingSetup, setRecordingSetup] = useState<RecordingSetup>(InitialRecordingSetup)
  const recorderRef = useRef<MediaRecorder>()
  const streamRef = useRef<MediaStream>()
  const chunksRef = useRef<BlobPart[]>([])

  const stopRecording = useCallback(async () => {
    if (typeof streamRef.current === "undefined") {
      throw new Error("ERROR_STOP_RECORDING: streamRef is undefined")
    }

    setStatus("STOPPING")
    const tracks = streamRef.current.getTracks()
    tracks.forEach((track) => { track.stop() })

    const playback = await saveRecording(chunksRef.current)
    setRecordingSetup((prev) => ({ ...prev, playback }))
    setStatus("PLAYING")
  }, [])

  const downloadRecording = useCallback(async () => {
    if (typeof recordingSetup.playback === "undefined") return
    await downloadService(recordingSetup.playback, recordingSetup.name)
  }, [recordingSetup.playback, recordingSetup.name])

  const dataAvailable = (e: BlobEvent): void => {
    if (e.data.size <= 0) return
    chunksRef.current.push(e.data)
  }

  const startRecording = useCallback(async (nameRecording: string) => {
    streamRef.current = await selectDisplayMedia()
    if (typeof streamRef.current === "undefined") {
      throw new Error("ERROR_START_RECORDING: streamRef is undefined")
    }

    recorderRef.current = createMediaRecorder(streamRef.current)
    recorderRef.current.ondataavailable = dataAvailable
    recorderRef.current.onstop = stopRecording

    const tracks = streamRef.current.getTracks()
    tracks.forEach((track) => {
      track.addEventListener("ended", () => recorderRef.current?.stop())
    })

    setStatus("RECORDING")
    setRecordingSetup((prev) => ({ ...prev, name: nameRecording }))
    recorderRef.current.start(5000)
  }, [stopRecording])

  return {
    status,
    preview: streamRef.current,
    playback: recordingSetup.playback,
    startRecording,
    downloadRecording,
    stopRecording
  }
}
