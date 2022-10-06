import { useState, useEffect } from 'react';
import axios from 'axios';
import loading from '../assets/loading.gif';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TituloPagina from './TituloPagina';

function EscolherFilme(props) {
    const { posterURL, id } = props;

    return (
        <Link to = {`/sessoes/${id}`}>
            <img src={posterURL} alt="poster do filme" />
        </Link>
    )
}

export default function Filmes() {
	const [items, setItems] = useState(null);

	useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		requisicao.then(resposta => {
			setItems(resposta.data);
		});
		requisicao.catch(erro => {
			console.log(erro.response.data);
		});
	}, []);

	if(items === null) {
		return <img src={loading} alt='carregando'/>;
	}

	return (
		<FilmesContainer>
            <TituloPagina>Selecione o filme</TituloPagina>
			{items.map((value, index) => <EscolherFilme key={index} posterURL={value.posterURL} id={value.id} />)}
		</FilmesContainer>
	);
}

const FilmesContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    background: #FFFFFF;
    padding-right: 20px;   
    
    img {
        width: 129px;
        height: 193px;
        margin-left: 20px;
        margin-bottom: 15px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.4);
        border-radius: 3px;
    }
`;