import { type FC, type FormEvent } from "react"
import { Button, Input } from "@/components"
import styles from "@/styles/main-view.module.css"

interface MainViewProps {
  show: boolean
  onStartRecording: (nameRecording: string) => Promise<void>
}

export const MainView: FC<MainViewProps> = ({ show, onStartRecording }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const nameValue = formData.get("name-recording")
    const nameRecording = nameValue?.toString().trim()
    if (typeof nameRecording === "undefined" || nameRecording.length === 0) return
    void onStartRecording(nameRecording)
  }

  if (!show) return null
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="name-recording"
        autoComplete="off"
        placeholder="Nombre para la grabación"
      />
      <Button>Grabar</Button>
    </form>
  )
}
