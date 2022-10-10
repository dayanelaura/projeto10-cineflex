import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TituloPagina from './TituloPagina';
import loading from '../assets/loading.gif';

function ExibirRodape(props){
    const { posterURL, title } = props;

    return (
        <Footer>
            <img data-identifier="movie-img-preview" src={posterURL} alt="poster do filme" />
            <p data-identifier="movie-and-session-infos-preview">{title}</p>
        </Footer>
    )
}

function EscolherHorario(props){
    const { weekday, date, showtimes } = props;

    return (
        <>
        <SessoesContainer>
            <p data-identifier="session-date">{weekday} - {date}</p>
            <div>
            {showtimes.map((value) => 
                <Link 
                    data-identifier="hour-minute-btn" 
                    to = {`/assentos/${value.id}`} 
                    style={{ textDecoration: 'none' }}
                    key={value.id} >
                    <span>{value.name}</span>
                </Link>
            )}
            </div>
        </SessoesContainer>
        </>
    )
}

export default function Sessoes() {
	const [items, setItems] = useState(null);
    const { idFilme } = useParams();

	useEffect(() => {
		const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

		requisicao.then(resposta => {
			setItems(resposta.data);
		});
		requisicao.catch(erro => {
			console.log(erro.response.data);
		});
	}, [idFilme]);

	if(items === null) {
		return <img src={loading} alt='carregando'/>;
	}
    else{
        const days = items.days;
        return (
            <>
            <TituloPagina>Selecione o horário</TituloPagina>
            {days.map((value, index) => 
                <EscolherHorario key={index} weekday={value.weekday}
                                date={value.date} showtimes={value.showtimes} />
                )}
            <ExibirRodape posterURL={items.posterURL} title={items.title}/>
            </>
        );
    }
}

const SessoesContainer = styled.div`
    width: 100vw;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    
    p {
        line-height: 23px;
        font-size: 20px;
        letter-spacing: 0.02e;
        color: #293845;
        padding-left: 28px;
    }

    div {
        display: flex;
        padding-left: 28px;
    }

    span {
        width: 83px;
        height: 43px;
        margin: 23px 8px;
        margin-left: 0px;
        color: #FFFFFF;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.02e;
        background-color: #E8833A;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`

const Footer = styled.div`
    width: 100vw;
    height: 117px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 28px;
    
    img {
        background: #FFFFFF;
        box-shadow: 4px 4px 4px 5px rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        width: 48px;
        height: 72px;
        margin-right: 22px;
    }

    p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
    }
`