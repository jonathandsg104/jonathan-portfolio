import React, { useState, useEffect } from 'react';
import ArrowUpIcon from '../../assets/icons/arrow-up.png'; // Certifique-se de que o caminho está correto
import styles from './ScrollToTopButton.module.css';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Exibe o botão se a rolagem for maior que 15% da altura da janela
      setIsVisible(window.scrollY > window.innerHeight * 0.15);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className={styles.scrollButton}
          aria-label="Voltar ao topo"
        >
          <img src={ArrowUpIcon} alt="Voltar ao topo" className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;