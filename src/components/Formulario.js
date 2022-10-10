import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Formulario(props){
    const { ids, hora, title, yearday, cadeiras } = props;

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    function preencherForm(e){ 
        e.preventDefault();

        if(cadeiras.length===0)
        alert('Selecione pelo menos 1 assento')
        else{

        let reserva = { 
            ids, 
            name, 
            cpf
        };
        let ingressos = { 
            ...reserva, 
            title, 
            yearday, 
            hora,
            cadeiras 
        };
        
        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', reserva);

        promise.then(() => navigate("/sucesso", { state: {ingressos} }));
        promise.catch(()=> alert("erro"))
        }
    }

    return(
        <AjusteLayout>
            <FormsContainer>
                <form onSubmit={preencherForm}>
                    <label htmlFor="Nome do comprador"> Nome do comprador: </label>
                    <input
                        data-identifier="buyer-name-input" 
                        type="text" placeholder="Digite seu nome..."
                        onChange={(e) => setName(e.target.value)}
                        value={name} required />
                    <label htmlFor="CPF do comprador"> CPF do comprador: </label>
                    <input 
                        data-identifier="buyer-cpf-input"
                        type="number" placeholder="Digite seu CPF..."
                        onChange={(e) => setCpf(e.target.value)}
                        value={cpf} required />
                    <button 
                        data-identifier="reservation-btn" 
                        type="submit"> 
                        Reservar assento(s) 
                    </button>
                </form>
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
    width: 360px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    flex-direction: column;
    margin-top: 42px;
    margin-left: -15px;

    label {
        width: 360px;
        height: 25px;
        font-style: normal;
        display: flex;
        align-items: center;
        color: #293845;
    }
    input {
        width: 360px;
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
        margin-left: 65px;
    }
`