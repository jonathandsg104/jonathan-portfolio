import React, { useState } from 'react';
import styles from './Chatbot.module.css'; // Estilos modulares
import fotoJonathan from '../Home/image/foto-jonathan.png'; // Caminho corrigido para a foto

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "**👋 Olá!** Sou Jonathan, seu assistente virtual. Pergunte-me algo sobre meu currículo, projetos ou contato!"
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isMinimized, setIsMinimized] = useState<boolean>(false); // Controla o estado de minimização
  const [isOpen, setIsOpen] = useState<boolean>(true); // Controla se o chatbot está aberto

  // Mapear palavras-chave relacionadas a um único texto
  const responseMap: { keywords: string[]; response: string }[] = [
    {
      keywords: ["tecnologia", "desafios"],
      response: "**📚 Tecnologia e Desafios:** Sou um profissional apaixonado por tecnologia, buscando sempre novos desafios e aprendizado contínuo."
    },
    {
      keywords: ["formação", "ufsc", "unesc", "curso", "graduação", "bacharelado", "licenciatura", "especialização"],
      response: "**🎓 Formação Acadêmica:** Inclui Tecnologia da Informação e Comunicação (UFSC - Concluído em 2019) e Ciência da Computação (incompleto - UNESC)."
    },
    {
      keywords: ["galo", "gestão", "experiência"],
      response: "**📊 Experiência Profissional:** Proprietário da Galo Placas Veiculares Ltda, gerenciando operações administrativas, clientes e finanças."
    },
    {
      keywords: ["habilidades", "javascript", "react", "node"],
      response: "**💻 Habilidades:** Desenvolvimento com JavaScript, criação de interfaces com React, backend com Node.js e programação mobile com React Native."
    },
    {
      keywords: ["cursos", "complementares", "fullstack"],
      response: "**📜 Cursos Complementares:** Realizei o curso Fullstack JavaScript pela OneBitcode em 2022, aprimorando minhas habilidades."
    },
    {
      keywords: ["projetos", "número de projetos", "detalhes"],
      response: "**🛠 Projetos:** Atualmente, tenho [X projetos]. Alguns incluem [nome do projeto 1] e [nome do projeto 2]. Gostaria de mais detalhes sobre algum deles?"
    },
    {
      keywords: ["currículo", "carreira"],
      response: "**📄 Currículo:** Posso te enviar meu currículo completo! Pergunte sobre algo específico, como habilidades ou formação."
    }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue.toLowerCase(); // Normaliza a mensagem do usuário
      setMessages([...messages, `**🙋‍♂️ Usuário:** ${inputValue}`]); // Adiciona a mensagem do usuário ao histórico

      // Busca a resposta associada às palavras-chave
      const matchedResponse = responseMap.find((entry) =>
        entry.keywords.some((keyword) => userMessage.includes(keyword))
      );

      const botResponse = matchedResponse
        ? matchedResponse.response
        : "**⚠️ Chatbot Jonathan:** Desculpe, ainda estou aprendendo! Poderia reformular sua pergunta?"; // Resposta padrão

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setInputValue(""); // Limpa o campo de entrada
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage(); // Envia a mensagem quando a tecla Enter é pressionada
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false); // Fecha o chatbot completamente
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar e restaurar
  };

  if (!isOpen) {
    return null; // Não renderiza o chatbot se estiver fechado
  }

  return (
    <div className={styles.chatbot} style={{ height: isMinimized ? '60px' : '400px' }}>
      <header className={styles.header}>
        <img src={fotoJonathan} alt="Jonathan Chatbot" className={styles.avatar} />
        <span>Chatbot Jonathan</span>
        <div className={styles.controls}>
          <button onClick={handleToggleMinimize} className={styles.minimizeButton} aria-label="Minimizar chatbot">
            {isMinimized ? '+' : '-'}
          </button>
          <button onClick={handleCloseChat} className={styles.closeButton} aria-label="Fechar chatbot">
            X
          </button>
        </div>
      </header>

      {!isMinimized && (
        <>
          <div className={styles.chatContent}>
            {messages.map((message, index) => (
              <p key={index} className={styles.message}>
                {message}
              </p>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown} // Lida com o evento de pressionar teclas
              placeholder="Digite sua mensagem..."
              className={styles.input}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;





