import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sessoes from './Sessoes';
import Filmes from "./Filmes";
import Assentos from "./Assentos";
import Sucesso from "./Sucesso";

export default function App(){
    return (
      <>
        <BrowserRouter>
        <GlobalStyles />
        <Topo>CINEFLEX</Topo>
        <Routes>
            <Route index element={<Filmes />}></Route>
            <Route path="/sessoes/:idFilme" element={<Sessoes />}></Route>
            <Route path="/assentos/:idSessao" element={<Assentos />}></Route>
            <Route path="/sucesso" element={<Sucesso />}></Route>
            {/* <Route path='*' element={<h1>Not Found</h1>} /> */}
        </Routes>
        </BrowserRouter>
      </>
    )    
}

const Topo = styled.div`
    background-color: #C3CFD9;
    width: 100vw;
    height: 67px;
    font-family: 'Roboto', normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #E8833A;
`;