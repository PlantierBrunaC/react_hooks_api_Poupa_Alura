import axios from "axios";
import { ITransacoes, IUsuario } from "../types";

const api = axios.create({
    baseURL: "http://localhost:5000",

});

export const obterUsuario = async (): Promise<IUsuario[]> => {

    const { data } = await api.get<IUsuario[]>("/usuarios")
    return data;
}

export const criarUsuario = async (usuario: Omit<IUsuario, "id" | "orcamentoDiario">): Promise<IUsuario> => {
    const usuarioComOrcamentoDiario = {
        ...usuario, orcamentoDiario: usuario.renda / 30,
    }
    // orçamento diario Dividido por 30 pelos dias do mês 


    const { data } = await api.post<IUsuario>("/usuarios", usuarioComOrcamentoDiario)
    return data;
}

export const atualizarUsuario = async (id: string, dados: Partial<IUsuario>): Promise<IUsuario> => {
    const { data } = await api.patch(`/usuaios/${id}`, dados);
    return data;
}
//  USO DE CRASE NA FUNÇÃO ACIMA É PARA INTERPOLAR O LINK O PATCH É PARA ATUALIZAR O DADO DO USUARIO NA API 

export const obterTransacoes = async (): Promise<ITransacoes[]> => {
    const { data } = await api.get<ITransacoes[]>("/transacoes")
    return data;

}

export const criarTransacoes = async (
    transacao: Omit<ITransacoes, "id" | "userID">,
    usuario: Omit<IUsuario, "nome">
): Promise<{transacao: ITransacoes, novoOrcamentoDiario: number}> => {
    const transacaoComId = { ...transacao, userID: usuario.id };
    const { data } = await api.post<ITransacoes>("/transacoes", transacaoComId);

    const transacoes = await obterTransacoes();
    const saldo = calcularSaldo(transacoes);

    const novoOrcamentoDiario = usuario.renda / 30 + saldo;

    await atualizarUsuario(usuario.id, { 
        orcamentoDiario: novoOrcamentoDiario,
     }).catch((err) => console.error(err));


    return {transacao: data, novoOrcamentoDiario};
};

const calcularSaldo = (transacoes: ITransacoes[]): number => {
    return transacoes.reduce((total, transacao) => {
        return transacao.tipo === "receita" ? total + transacao.valor : total - transacao.valor;

    }, 0)
}

// Precisa colocar um valor inicial para o uso de REDUCE, que é o 0 apos as chaves 

