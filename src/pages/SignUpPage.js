import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function SignUpPage() {
  const [formulario, setFormulario] =useState({ nome:'', email: '', senha: ''})
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const navigate = useNavigate()

function enviar(ele){
  ele.preventDefault()
  

  if (+formulario.senha !== +confirmaSenha) {
    alert("A senha e a confirmação devem ser iguais")
    return
  }
  
  const promisse = axios.post('https://mywallet-27hy.onrender.com/sing-up', formulario)
  
    promisse.then(() => {
      navigate("/")
    })

    promisse.catch((err) => {
  alert(err.response.data)
    })

}

function montar(ele) {
  setFormulario({ ...formulario, [ele.target.name]: ele.target.value })
}


  return (
    <SingUpContainer>
      <form onSubmit={enviar}>
        <MyWalletLogo />
        <input placeholder="Nome" name="nome" value={formulario.nome} type="text" onChange={montar} />
        <input placeholder="E-mail" name="email" value={formulario.email} onChange={montar} type="email" />
        <input placeholder="Senha" name="senha"  value={formulario.senha} onChange={montar} type="password" autoComplete="new-password" />
        <input placeholder="Confirme a senha"  onChange={e => setConfirmaSenha(e.target.value)}  type="password" autoComplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
