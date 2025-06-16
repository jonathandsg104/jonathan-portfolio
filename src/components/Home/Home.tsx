import React, { useEffect, useState, FC } from 'react';
import { HomeIcon } from '../../assets/icons';
import fotoJonathan from './image/foto-jonathan.png';
import styles from './Home.module.css';

interface HomeProps {
  onOpenChatbot: () => void;
}

const Home: FC<HomeProps> = ({ onOpenChatbot }) => {
  const [text, setText] = useState<string>('');
  const message: string = 'A tecnologia é a arte de transformar o impossível em realidade.';

  // Efeito para exibir o texto de forma animada
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(message.substring(0, index + 1));
      index++;
      if (index === message.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [message]);

  // Função para abrir o chatbot e rolar até ele
  const handleChatbotClick = (): void => {
    onOpenChatbot(); // Abre o chatbot
    
    // Aguarda um pouco para o chatbot renderizar e então rola até ele
    setTimeout(() => {
      const chatbotElement = document.querySelector('[class*="chatbot"]');
      if (chatbotElement) {
        chatbotElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // Adiciona uma pequena animação visual para chamar atenção
        chatbotElement.classList.add('highlight');
        setTimeout(() => {
          chatbotElement.classList.remove('highlight');
        }, 2000);
      }
    }, 100);
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
      <div className={styles.imageContainer}>
        <img
          src={fotoJonathan}
          alt="Foto de Jonathan da Silva Gomes"
          className={styles.profileImage}
          onClick={handleChatbotClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleChatbotClick();
            }
          }}
        />
        <p className={styles.clickInfo}>
          Clique na foto para interagir com o Chatbot!
        </p>
      </div>

      {/* Seção de apresentação */}
      <div className={styles.introduction}>
        <h2 className={styles.subtitle}>Jonathan da Silva Gomes</h2>
        <p className={styles.description}>
          Desenvolvedor Full Stack apaixonado por tecnologia e inovação. 
          Especializado em JavaScript, React, Node.js e desenvolvimento mobile.
        </p>
        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <span className={styles.highlightNumber}>3+</span>
            <span className={styles.highlightText}>Anos de Experiência</span>
          </div>
          <div className={styles.highlight}>
            <span className={styles.highlightNumber}>10+</span>
            <span className={styles.highlightText}>Projetos Concluídos</span>
          </div>
          <div className={styles.highlight}>
            <span className={styles.highlightNumber}>100%</span>
            <span className={styles.highlightText}>Dedicação</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Home };
export default Home;
