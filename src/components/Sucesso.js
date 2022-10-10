import TituloPagina from "./TituloPagina";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Sucesso(){
    const location = useLocation();
    const dadosReserva = location.state.ingressos;

    const { cpf, name, hora, yearday, title, weekday, cadeiras } = dadosReserva;
    //console.log(cadeiras)

    return(
        <>
            <TituloPagina fontweight={700} color={`#247A6B`}>
                <p>Pedido feito</p>
                <p>com sucesso!</p>
            </TituloPagina>
            <IngressoContainer>
                <h1>Filme e sessão</h1>
                <p>{title}</p>
                <p>{yearday} - {hora}</p>
                <h1>Ingressos</h1>
                { cadeiras.map((value, index) => (<p key={index}>Assento {value}</p>)) }
                <h1>Comprador</h1>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </IngressoContainer>
            <Link to="/">
                <BotaoHome>Voltar para Home</BotaoHome>
            </Link>
        </>
    )
}

const IngressoContainer = styled.div`
    width: 90vw;
    font-family: 'Roboto';
    font-style: normal;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 29px;
    color: #293845;

    h1 {
        margin-top: 25px;
        font-weight: 700;
        font-size: 24px;
    }

    p {
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 62px;
    }
`

const BotaoHome = styled.div`
    width: 50vw;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    margin-left: 114px;
`