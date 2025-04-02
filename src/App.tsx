import React from 'react';
import { Navbar } from './components/NavBar'; // Importando o Navbar
import { Home } from './components/Home'; // Importando Home
import { Sobre } from './components/Sobre'; // Importando Sobre
import { Projetos } from './components/Projetos'; // Importando Projetos
import { Contato } from './components/Contato'; // Importando Contato
import { ScrollToTopButton } from './components/ScrollToTopButton'; // Botão de Scroll
import { Chatbot } from './components/Chatbot'; // Importando Chatbot

const App: React.FC = () => {
  return (
    <>
      {/* Barra de navegação */}
      <Navbar />
      {/* Seções principais */}
      <Home />
      <Sobre />
      <Projetos />
      <Contato />
      {/* Botão de rolar para o topo */}
      <ScrollToTopButton />
      {/* Chatbot sempre disponível */}
      <Chatbot />
    </>
  );
};

export default App;
