import axios from "axios";
import { ITransacoes, IUsuario } from "../types";
import OrcamentoDiario from "../componentes/OrcamentoDiario";

const api = axios.create({
    baseURL: "http://localhost:5000",

});

export const obterUsuario = async (): Promise<IUsuario[]> => {

    const {data} = await api.get<IUsuario[]>("/usuarios")
    return data; 
}

export const criarUsuario = async(usuario: Omit<IUsuario, "id" | "orcamentoDiario">): Promise<IUsuario> =>{
    const usuarioComOrcamentoDiario = {
        ...usuario, OrcamentoDiario: usuario.renda / 30,
    }
    // orçamento diario Dividido por 30 pelos dias do mês 
    
    
    const {data} = await api.post<IUsuario>("/usuarios", usuarioComOrcamentoDiario)
    return data; 
}

const atualizarUsuario = async (id: string, dados: IUsuario) => {
 const {data} = await api.patch(`/usuaios/${id}`, dados); 
 return data; 
}
//  USO DE CRASE NA FUNÇÃO ACIMA É PARA INTERPOLAR O LINK O PATCH É PARA ATUALIZAR O DADO DO USUARIO NA API 

export const obterTransacoes = async (): Promise<ITransacoes[]> =>{
    const {data} = await api.get<ITransacoes[]>("/transacoes")
    return data; 
    
}

export const criarTransacoes = async(transacao: Omit<ITransacoes, "id">): Promise<ITransacoes> =>{
    const {data} = await api.post<ITransacoes>("/transacoes", transacao)
    return data; 
}