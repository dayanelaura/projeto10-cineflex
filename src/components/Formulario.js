import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Formulario(props){
    const { IDs, setIDs, hora, title, numero, weekday, yearday } = props;

    const [nome, setNome] = useState("");
    const [CPF, setCPF] = useState("");
    let ingressos = {};
    let reserva = {};
    const navigate = useNavigate();

    function preencherForm(){ 
        
        if(IDs.length===0)
            alert("Nenhum assento foi selecionado")
        else{
            reserva = { IDs, nome, CPF }
            ingressos = { ...reserva, title, yearday, hora }
        }
    }

    function enviarPedido(e){
        e.preventDefault();

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', reserva);

        promise.then(() => navigate("/sucesso", { state: ingressos }));
        promise.catch(()=> alert("erro"))
    }

    return(
        <AjusteLayout>
            <FormsContainer onSubmit={preencherForm}>
                <label htmlFor="Nome do comprador"> Nome do comprador: </label>
                <input type="text" name="name" placeholder="Digite seu nome..."
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                />
                <label htmlFor="CPF do comprador"> CPF do comprador: </label>
                <input type="text" name="cpf" placeholder="Digite seu CPF..."
                    onChange={(e) => setCPF(e.target.value)}
                    value={CPF}
                />
                <button type="submit" onClick={enviarPedido}> Reservar assento(s) </button>
            </FormsContainer> 
        </AjusteLayout>
    )
}

const AjusteLayout = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormsContainer = styled.div`
    width: 328px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 42px;

    label {
        width: 327px;
        height: 25px;
        font-style: normal;
        display: flex;
        align-items: center;
        color: #293845;
    }
    input {
        width: 327px;
        height: 51px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-style: italic;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #AFAFAF;
        margin-bottom: 7px;
    }
    button {
        width: 225px;
        height: 42px;
        margin-top: 50px;
        background: #E8833A;
        border-radius: 3px;
        font-style: normal;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
        margin-bottom: 147px;
    }
`