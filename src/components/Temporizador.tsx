import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'
interface TemporizadorProps {
  key: any
  duracao: number
  tempoEsgotado: () => void
}
export default function Temporizador(props: TemporizadorProps) {
  return (
    <div className={styles.temporizador}>
      <CountdownCircleTimer 
      size={120}
      duration={props.duracao}
      isPlaying
      onComplete={props.tempoEsgotado}
      colors={['#bce596', '#f7b801', '#ed827a']}
      colorsTime={[10, 7, 0]}
      >{({ remainingTime }) => remainingTime}</CountdownCircleTimer>
    </div>
  )
}