import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {

  const [formulario, setFormulario] =useState({email: '', senha: ''})
  const {setUser}=useContext(UserContext)
  const navigate = useNavigate()

function enviar(ele){
  ele.preventDefault()
 
  
  const promisse = axios.post('https://mywallet-27hy.onrender.com/sing-in', formulario)
  
    promisse.then(res => {
      setUser(res.data)
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
    <SingInContainer>
      <form onSubmit={enviar}>
        <MyWalletLogo />
        <input placeholder="E-mail" name="email" value={formulario.email} onChange={montar} type="email" />
        <input placeholder="Senha" name="senha" value={formulario.nome} onChange={montar} type="password" autocomplete="new-password" />
        <button type="submit">Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
