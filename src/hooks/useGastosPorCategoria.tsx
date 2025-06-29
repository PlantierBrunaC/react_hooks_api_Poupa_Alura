import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'

const useGastosPorCategoria = () => {
const {transacoes} = useAppContext();

const gastosPorCategoria = useMemo(() =>{
    return transacoes.filter((Transacao) => Transacao.tipo === "despesa")
    .reduce<Record<string, number>>((total, transacao) => {
        total[transacao.categoria] = 
        (total[transacao.categoria] || 0) + transacao.valor;
        return total; 
    }, {});
}, [transacoes]); 
  return gastosPorCategoria; 
}

export default useGastosPorCategoria