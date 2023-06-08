import questoes from '../bancoDeQuestoes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: any, res: any) => {
  const idSelecionado = +req.query.id

  const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)
  if(unicaQuestaoOuNada.length === 1) {
    const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
    
    res.status(200).json(questaoSelecionada.paraObjeto())
  }
  res.status(204).send()
}