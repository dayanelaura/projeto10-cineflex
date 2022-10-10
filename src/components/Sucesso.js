import TituloPagina from "./TituloPagina";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Sucesso(){
    const location = useLocation();
    const dadosReserva = location.state.ingressos;
    const { cpf, name, hora, yearday, title, cadeiras } = dadosReserva;
    
    return(
        <>
            <TituloPagina fontweight={700} color={`#247A6B`}>
                <p>Pedido feito</p>
                <p>com sucesso!</p>
            </TituloPagina>
            <IngressoContainer>
                <h1>Filme e sessão</h1>
                <h2 data-identifier="movie-session-infos-reserve-finished">{title}</h2>
                <h2 data-identifier="movie-session-infos-reserve-finished">{yearday} {hora}</h2>
                <h1>Ingressos</h1>
                { cadeiras.map((value, index) => (
                    <h2 data-identifier="seat-infos-reserve-finished" key={index}>
                    Assento {value}
                    </h2> )) }
                <h1>Comprador</h1>
                <h2 data-identifier="buyer-infos-reserve-finished">Nome: {name}</h2>
                <h2 data-identifier="buyer-infos-reserve-finished">CPF: {cpf}</h2>
            </IngressoContainer>
            <Link to="/" data-identifier="back-to-home-btn" style={{ textDecoration: 'none' }}>
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
        margin-top: 38px;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }

    h2 {
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 5px;
    }
`

const BotaoHome = styled.div`
    width: 50vw;
    height: 42px;
    margin-top: 102px;
    margin-bottom: 80px;
    margin-left: 100px;
    margin-right: 100px;
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
    text-decoration: none;
`