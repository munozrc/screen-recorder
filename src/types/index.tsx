export type Status = "IDLE" | "RECORDING" | "STOPPING" | "PLAYING"

export interface RecordingSetup {
  name: string
  playback?: string
}
