import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import TituloPagina from './TituloPagina';
import loading from '../assets/loading.gif';
import CORES from '../mock';
import Formulario from './Formulario';

function ExibirRodape(props){
    const { posterURL, title, hora, weekday } = props;

    return (
        <Footer>
            <img src={posterURL} alt="poster do filme" />
			<div>
				<p>{title}</p>
				<p>{weekday} - {hora}</p>
			</div>
        </Footer>
    )
}
	
const { verde, cinza, amarelo, bordaverde, bordacinza, bordaamarela } = CORES;
const cadeiras = [];

function EscolherAssentos(props){
	const { status, numero, ID, ids, setIds } = props;
	
    const [cor,setCor] = useState(cinza);
	const [borda, setBorda] = useState(bordacinza);
    const [selecionado, setSelecionado] = useState(false);

	if (status===false){
		return(
			<DivAssento 
				background={amarelo} 
				border={bordaamarela}
				onClick={() => alert("Esse assento não está disponível")}>
				{numero}
			</DivAssento>
		)
	}
    else if(status){
		return(
			<DivAssento 
				background={cor}  
				border={borda}
				onClick={() => {
					trocarCor();
					setIds([...ids, ID]);
					setSelecionado(!selecionado);
				}}>
				{numero}
			</DivAssento>
		)
	}

	function removerAssento(){
		for (let i=0; i<cadeiras.length; i++){
			if (cadeiras[i]===numero)
				cadeiras.splice(i,1)
		}
	}

	function trocarCor(){
		if(selecionado===false){
			setCor(verde);
			setBorda(bordaverde);
			cadeiras.push(numero);
		}
		else if(selecionado===true){
			setCor(cinza);	
			setBorda(bordacinza);
			removerAssento();
		}
	}
}

export default function Assentos() {
	const [items, setItems] = useState(null);
	const { idSessao } = useParams();
	const [ids, setIds] = useState([]);

	useEffect(() => {
		const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

		requisicao.then(resposta => {
			setItems(resposta.data);
		});
		requisicao.catch(erro => {
			console.log(erro.response.data);
		});
	}, [idSessao]);

	if(items === null) {
		return <img src={loading} alt='carregando'/>;
	}
    else{
        const seats = items.seats;
		const movie = items.movie;
		const day = items.day;
        return (
            <>
            <TituloPagina>Selecione o(s) assento(s)</TituloPagina>
			<AssentosContainer>
				<span>
					{seats.map((value, index) => 
						<EscolherAssentos key={index} 
							numero={value.name} 
							status={value.isAvailable} 
							ID={value.id} 
							ids={ids} 
							setIds={setIds}/>
					)}
				</span>
			</AssentosContainer>
			<Legenda>
				<span>
					<DivAssento background={verde} border={bordaverde}></DivAssento>
					<h1>Selecionado</h1>
				</span>
				<span>
					<DivAssento background={cinza} border={bordacinza} ></DivAssento>
					<h1>Disponível</h1>
				</span>
				<span>
					<DivAssento background={amarelo} border={bordaamarela}></DivAssento>
					<h1>Indisponível</h1>
				</span>
			</Legenda>
			<Formulario 
				ids={ids} setIds={setIds} hora={items.name} 
				title={movie.title} cadeiras={cadeiras}
				weekday={day.weekday} yearday={day.date} 
			/>
            <ExibirRodape 
				posterURL={movie.posterURL} title={movie.title} 
				hora={items.name} weekday={day.weekday} />
            </>
        );
    }
}

const DivAssento = styled.div`
	width: 26px;
	height: 26px;
	margin-bottom: 6px;
	border-radius: 17px;
	background: ${(props) => props.background};
	border: 1px solid ${(props) => props.border};
`
const Legenda = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		width: 111px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	h1 {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		line-height: 15px;
		display: flex;
		align-items: center;
		letter-spacing: -0.013em;
		color: #4E5A65;
	}
`

const AssentosContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: -15px;

	span {
		width: 390px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 18px 5px ;
		margin-top: 0px;
		font-family: 'Roboto';
		font-weight: 400;
		font-size: 11px;
		text-align: center;
		letter-spacing: 0.04em;
		color: #000000;
		line-height: 13px;
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
    flex-wrap: wrap;

    img {
        background: #FFFFFF;
        box-shadow: 4px 4px 4px 5px rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        width: 48px;
        height: 72px;
        margin-right: 10px;
    }

    p {
		margin-left: 20px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #293845;
    }
`