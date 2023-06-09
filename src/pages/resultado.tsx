import { useRouter } from 'next/router';
import styles from '../styles/Resultado.module.css'
import Estatistica from '@/components/Estatistica'
import Botao from '@/components/Botao'

export default function Resultato() {
  const router = useRouter()

  const total = router.query && router.query.total ? +router.query.total : 0;
  const certas = router.query && router.query.certas ? +router.query.certas : 0;
  const percentual = Math.round((certas / total) * 100)
  return(
      <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display: "flex" }}>
                <Estatistica texto="Perguntas" valor={total} />
                <Estatistica texto="Certas" valor={certas}
                    background="#9CD2A4"/>
                <Estatistica texto="Percentual" valor={`${percentual}%`}
                    background="#DE6A33" />
            </div>
            <Botao href="/" texto="Tentar Novamente" />
      </div>
  )
}