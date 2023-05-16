import type { RecordingSetup } from "@/types"

export const displayMediaOptions: DisplayMediaStreamOptions = {
  video: true,
  audio: {
    autoGainControl: false,
    echoCancellation: false,
    noiseSuppression: false
  }
}

export const videoMimeTypes = [
  "video/mp4;codecs=h264",
  "video/webm;codecs=h264",
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8"
]

export const InitialRecordingSetup: RecordingSetup = {
  name: "",
  playback: undefined
}
