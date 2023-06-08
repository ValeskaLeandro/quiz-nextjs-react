import QuestaoModel from '@/model/questao'
import { useEffect, useState } from 'react'
import Questionario from '@/components/Questionario'
import { useRouter } from 'next/router'

const BASE_URL = 'https://quiz-do-milhao-phi.vercel.app//api'

export default function Home() {  
  const router = useRouter()
  const [questao, setQuestao] = useState<QuestaoModel>() 
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }
  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const questao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(questao)
  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas( respostasCertas + (acertou? 1 : 0))
  }

  function idProximaPergunta(){
      if(questao){
        const proximoId = idsDasQuestoes.indexOf(questao.id) + 1
        return idsDasQuestoes[proximoId]
      }    
  }
  function proximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? proximaQuestao(proximoId) : finalizar()
  }

  function proximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }
  return (   
    questao ?
      <Questionario questao={questao} ultima={idProximaPergunta() === undefined} 
      questaoRespondida={questaoRespondida}
      proximoPasso={proximoPasso}/>
      : false    
  )
}
