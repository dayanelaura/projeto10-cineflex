import styled from 'styled-components';

const TituloPagina = styled.div`
    width: 100vw;
    height: 110px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-weight: ${(props) => props.fontweight};
    font-size: 24px;
    line-height: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #293845;
    color: ${(props) => props.color}
`;

export default TituloPagina;