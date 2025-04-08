import React, { useState } from 'react';
import styles from './Chatbot.module.css'; // Estilos modulares
import fotoJonathan from '../Home/image/foto-jonathan.png'; // Caminho corrigido para a foto
import Fuse from 'fuse.js';

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
      keywords: ["tecnologia", "desafios", "inovação", "soluções"],
      response: "**📚 Tecnologia e Inovação:** Sou apaixonado por tecnologia e busco criar soluções inovadoras enquanto enfrento novos desafios!"
    },
    {
      keywords: ["formação", "ufsc", "unesc", "curso", "graduação", "bacharelado", "licenciatura", "educação", "universidade"],
      response: "**🎓 Formação Acadêmica:** Graduação em Tecnologia da Informação e Comunicação (UFSC - 2019) e Ciência da Computação (incompleto - UNESC)."
    },
    {
      keywords: ["galo", "gestão", "experiência", "administração", "empreendimento", "empresa", "estratégia", "finanças"],
      response: "**📊 Experiência Profissional:** Proprietário da Galo Placas Veiculares Ltda, liderando operações administrativas e comerciais com excelência."
    },
    {
      keywords: ["habilidades", "javascript", "react", "node", "typescript", "sql", "react native", "banco de dados", "programação"],
      response: "**💻 Habilidades Técnicas:** Desenvolvimento com JavaScript, TypeScript, React, Node.js, SQL e React Native para web e mobile."
    },
    {
      keywords: ["cursos", "fullstack", "onebitcode", "treinamento", "complementares"],
      response: "**📜 Cursos Complementares:** Formação Fullstack JavaScript pela OneBitcode em 2022, aprimorando competências em desenvolvimento moderno."
    },
    {
      keywords: ["projetos", "portfólio", "trabalhos", "detalhes", "site", "salão de beleza"],
      response: "**🛠 Projetos:** Incluem sistemas de gerenciamento e um site criado para um salão de beleza. Pergunte sobre algum projeto específico!"
    },
    {
      keywords: ["currículo", "perfil", "carreira", "profissional", "trajetória"],
      response: "**📄 Currículo:** Com formação em TI e experiência em gestão, sou multidisciplinar e motivado para desafios na área de desenvolvimento."
    },
    {
      keywords: ["contato", "whatsapp", "linkedin", "email", "redes sociais", "endereço"],
      response: "**📞 Contato:** Estou disponível pelo WhatsApp (+55 48 99657-3094), LinkedIn e e-mail (jonathan.dsg104@gmail.com). Vamos conversar!"
    },
    {
      keywords: ["objetivo", "carreira", "programação", "desenvolvimento", "web", "mobile"],
      response: "**🎯 Objetivo Profissional:** Atuar como desenvolvedor web e mobile, aplicando tecnologias modernas para criar soluções eficazes e inovadoras."
    },
    {
      keywords: ["sql", "banco de dados", "database", "gestão de dados", "sistemas"],
      response: "**🗄 Bancos de Dados:** Experiência em manipulação e gerenciamento de bancos de dados SQL, alinhada às melhores práticas de desenvolvimento."
    },
    {
      keywords: ["liderança", "gestão", "empreendedorismo", "estratégia", "administrativo"],
      response: "**🌟 Liderança e Estratégia:** Experiência em planejamento e controle administrativo, liderando equipes e gerenciando operações empresariais."
    },
    {
      keywords: ["react native", "mobile", "aplicações", "front-end", "interface"],
      response: "**📱 Aplicações Mobile:** Especialização no desenvolvimento de interfaces e aplicações responsivas utilizando React Native."
    },
    {
      keywords: ["node.js", "backend", "servidor", "api", "server-side"],
      response: "**🔧 Backend com Node.js:** Desenvolvimento de APIs e sistemas robustos para gerenciamento e integração de dados no server-side."
    },
    {
      keywords: ["javascript", "web", "frontend", "design", "programação"],
      response: "**🌐 Desenvolvimento Web:** Experiência em JavaScript para criação de interfaces interativas e designs otimizados no front-end."
    },
    {
      keywords: ["sql", "dados", "armazenamento", "relacional"],
      response: "**🗄 Manipulação de Dados:** Proficiente em SQL para gestão de armazenamento relacional e consultas otimizadas."
    }
  ];

  const handleSendMessage = () => {
  if (inputValue.trim()) {
    const userMessage = inputValue.toLowerCase().trim(); // Normaliza e remove espaços extras
    setMessages((prevMessages) => [...prevMessages, `**🙋‍♂️ Usuário:** ${inputValue}`]); // Adiciona ao histórico

    // Divide a frase do usuário em palavras-chave potenciais
    const messageParts = userMessage.split(" "); // Divide a frase por espaços

    // Configuração do Fuse.js para busca aproximada
    const fuseOptions = {
      includeScore: true, // Retorna a pontuação de similaridade
      threshold: 0.4, // Define o limite para considerar similar
      keys: ["keywords"] // Analisa somente as palavras-chave no `responseMap`
    };

    const fuse = new Fuse(responseMap, fuseOptions); // Instância do Fuse.js
    let bestMatch = null;

    // Verifica cada parte da frase para encontrar a melhor correspondência
    for (const part of messageParts) {
      const searchResults = fuse.search(part); // Busca pela palavra

      if (searchResults.length > 0) {
        // Pega o melhor resultado de cada parte
        const currentBestMatch = searchResults[0];

        // Atualiza `bestMatch` apenas se for mais relevante
        if (!bestMatch || (currentBestMatch?.score !== undefined && currentBestMatch.score < (bestMatch?.score || Infinity))) {
          bestMatch = currentBestMatch;
        }
      }
    }

    if (bestMatch && bestMatch.item) {
      const botResponse = bestMatch.item.response; // Resposta associada ao melhor resultado

      // Verifica se foi uma correspondência exata (baixa pontuação = alta similaridade)
      if (bestMatch.score !== undefined && bestMatch.score < 0.2) {
        setMessages((prevMessages) => [...prevMessages, botResponse]); // Resposta exata
      } else {
        // Sugere a palavra-chave mais próxima
        const suggestedWord = bestMatch.item.keywords.find((keyword) =>
          userMessage.includes(keyword.toLowerCase())
        );

        if (suggestedWord) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `**🤔 Você quis dizer:** "${suggestedWord}"?`,
            "⚠️ Caso sim, reformule sua frase para obter mais detalhes."
          ]);
        } else {
          // Caso não encontre sugestão direta
          setMessages((prevMessages) => [
            ...prevMessages,
            "**⚠️ Chatbot Jonathan:** Não consegui entender sua pergunta. Reformule-a, por favor!"
          ]);
        }
      }
    } else {
      // Caso nenhuma correspondência seja encontrada
      setMessages((prevMessages) => [
        ...prevMessages,
        "**⚠️ Chatbot Jonathan:** Não consegui encontrar uma resposta para sua pergunta."
      ]);
    }

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





