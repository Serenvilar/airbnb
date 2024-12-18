import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Title from './components/Title';
import Header from './components/Header';
import PaginaInicial from './components/PaginaInicial';
import NossoServico from './components/NossoServico';
import Sobre from './components/Sobre';
import Galeria from './components/Galeria';
import Reserva from './components/Reserva';
import SobreDono from './components/SobreDono';
import Feedbacks from './components/Feedbacks';
import Local from './components/Local';
import Suporte from './components/Suporte';
import Footer from './components/Footer';
import Login from './components/Login';  
import Quartos from './components/Quartos';
import AddQuarto from './components/AddQuarto';
import EditarQuarto from './components/EditarQuarto';
import ReservaQuarto from './components/ReservaQuarto';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="App">
                            <Title />
                            <Header />
                        </div>
                        <div>
                            <PaginaInicial />
                        </div>
                        <div className="App">
                            <NossoServico />
                            <Sobre />
                            <Galeria />
                            <Reserva />
                            <SobreDono />
                            <Feedbacks />
                        </div>
                        <div>
                            <Local />
                        </div>
                        <div className="App">
                            <Suporte />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </>
                } />
                <Route path="/login" element={<Login />} />  
                <Route path="/quartos" element={<Quartos />} /> 
                <Route path="/adicionar-quarto" element={<AddQuarto />} />
                <Route path="/editar-quarto/:id" element={<EditarQuarto />} />
                <Route path="/reserva-quarto/:id" element={<ReservaQuarto />} />
            </Routes>
        </Router>
    );
}

export default App;
