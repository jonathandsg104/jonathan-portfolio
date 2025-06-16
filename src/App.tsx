import React, { useState } from 'react';
import { Navbar } from './components/NavBar'; // Importando o Navbar
import { Home } from './components/Home'; // Importando Home
import { Sobre } from './components/Sobre'; // Importando Sobre
import { Projetos } from './components/Projetos'; // Importando Projetos
import { Contato } from './components/Contato'; // Importando Contato
import { ScrollToTopButton } from './components/ScrollToTopButton'; // Botão de Scroll
import { Chatbot } from './components/Chatbot'; // Importando Chatbot

const App: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(true);

  const openChatbot = (): void => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = (): void => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      {/* Barra de navegação */}
      <Navbar />
      {/* Seções principais */}
      <Home onOpenChatbot={openChatbot} />
      <Sobre />
      <Projetos />
      <Contato />
      {/* Botão de rolar para o topo */}
      <ScrollToTopButton />
      {/* Chatbot sempre disponível */}
      <Chatbot isOpen={isChatbotOpen} onClose={closeChatbot} />
    </>
  );
};

export default App;
