import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const {user,setUser} =useContext(UserContext)
  const tk = user.token
  const usu = user.usuario
  const navigate = useNavigate()
  console.log(tk);
  console.log(usu);
  const [tra,setTra]=useState([])
  const [saldo,setSaldo]=useState(0)
  let mont=0

  
 function sair(){
  setUser({})
  navigate("/")
 }

 

useEffect(() => {

  const conf = {
    headers: {
      "authorization": tk
    }
  }

  const promisse = axios.get('https://mywallet-27hy.onrender.com/transacao',conf)
  
  promisse.then(res => {
    setTra(res.data)
    console.log(tra);
  })

  promisse.catch((err) => {
alert(err.response.data)
  })
},[])


useEffect(()=>{
  setSaldo(0)
  mont = 0
for (let i = 0; i < tra.length; i++) {
  if(tra[i].tipo==='entrada'){
  mont+=(+tra[i].valor)
  }else{
    mont-=(+tra[i].valor)
  }
  
  setSaldo(mont)
}
},[tra])


  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {usu}</h1>
        <BiExit onClick={sair} />
      </Header>

      <TransactionsContainer>
        <ul>

          {tra.map((elemento)=>{
              return(
              <ListItemContainer>
              <div>
                <span>{elemento.dia}</span>
                <strong>{elemento.descricao}</strong>
              </div>
              <Value color={elemento.tipo==='entrada'&&"positivo"}>{elemento.valor}</Value>
            </ListItemContainer>
              )
            })}
          
          
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo>=0 &&"positivo"}>{saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
      <Link to={'/nova-transacao/:entrada'}>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        </Link>
        <Link to={'/nova-transacao/:saida'}>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`