import { useAppContext } from "../../context/AppContext";
import { Cartao, CartaoCabecalho, CartaoCorpo, Descricao } from "../Cartao";

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const OrcamentoDiario = () => {
  const { usuario } = useAppContext();

    console.log("Usuário no componente OrcamentoDiario:", usuario);


  return (
    <Cartao>
      <CartaoCabecalho>Orçamento diário disponível</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>{formatador.format(usuario?.orcamentoDiario ?? 0)}</Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};

// O uso de ?? é nullish coalescing operator, ou operador de coalescência nula, 
// usar pra quando quiser algum retorno que nao seja undefined ou null - 
// vai retornar 0 no lugar de undefined ou null

export default OrcamentoDiario;
