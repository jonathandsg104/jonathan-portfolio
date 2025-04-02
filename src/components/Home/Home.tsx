import React, { useEffect, useState, FC } from 'react';
import HomeIcon from '../../assets/icons/home.png'; // Ícone da casa
import fotoJonathan from './image/foto-jonathan.png'; // Foto de Jonathan
import Chatbot from '../Chatbot/Chatbot'; // Importando o componente do chatbot
import styles from './Home.module.css'; // Importando os estilos CSS Modules

const Home: FC = () => {
  const [text, setText] = useState<string>(''); // Estado para texto animado
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para abrir/fechar o chatbot
  const message: string =
    'A tecnologia é a arte de transformar o impossível em realidade.'; // Texto animado no banner

  // Efeito para exibir o texto de forma animada
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(message.substring(0, index + 1));
      index++;
      if (index === message.length) {
        clearInterval(intervalId); // Para a animação ao terminar
      }
    }, 100);

    return () => clearInterval(intervalId); // Limpa o intervalo para evitar vazamentos
  }, [message]);

  // Alterna o estado do chatbot
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <section id="home" className={styles.home}>
      {/* Título com ícone */}
      <h1 className={styles.title}>
        <img src={HomeIcon} alt="Ícone Home" className={styles.icon} />
        Bem-vindo ao Meu Portfólio
      </h1>

      {/* Texto animado dentro do banner azul */}
      <div className={styles.banner}>
        <p className={styles.bannerText}>{text}</p>
      </div>

      {/* Foto de Jonathan interativa */}
      <div className={styles.imageContainer} onClick={toggleChat}>
        <img
          src={fotoJonathan}
          alt="Foto de Jonathan"
          className={styles.profileImage}
        />
        <p className={styles.clickInfo}>Clique na foto para falar comigo no Chatbot!</p>
      </div>

      {/* Chatbot visível quando ativado */}
      {isChatOpen && <Chatbot />}
    </section>
  );
};

export default Home;
