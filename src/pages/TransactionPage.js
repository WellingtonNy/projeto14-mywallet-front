import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import {  useNavigate,useParams } from "react-router-dom"

import axios from "axios";


export default function TransactionsPage() {

  const [formulario, setFormulario] =useState({valor: '', descricao: '',tipo:tipo})
  const navigate = useNavigate()
  const {user} =useContext(UserContext)
  const tk = user.token
  const {tipo} = useParams()

function enviar(ele){
  ele.preventDefault()
  
  const conf = {
    headers: {
      "authorization": tk
    }
  }
  const promisse = axios.post('https://mywallet-27hy.onrender.com/transacao',formulario,conf)

  promisse.then(res=>{
    console.log('criado,201')
    navigate("/home")
  })

  promisse.catch((err) => {
    alert(err.response.data)
      })


}

function montar(ele) {
  setFormulario({ ...formulario, [ele.target.name]: ele.target.value })
}
  return (


    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={enviar}>
        <input placeholder="Valor" value={formulario.valor} onChange={montar} name="valor" type="text"/>
        <input placeholder="Descrição" name="descrecao" value={formulario.descricao} onChange={montar} type="text" />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
