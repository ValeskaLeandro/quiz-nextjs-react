import styles from '../styles/Estatistica.module.css'
interface EstatisticaProps {
  valor: any
  texto: string
  background?: string
  corForte?: string
}
export default function Estatistica(props: EstatisticaProps){
  return(
    <div className={styles.estatistica}>
      <div className={styles.valor} 
      style={{backgroundColor: props.background ?? '#FDD60f',
              color: props.corForte ?? '#333'}}>
        {props.valor}
      </div>
      <div className={styles.texto}>
        {props.texto}
      </div>
    </div>
  )
}