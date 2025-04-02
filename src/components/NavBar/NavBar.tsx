import React, { useState, FC } from 'react';
import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  SobreIcon,
  ProjectIcon,
  ContactIcon
} from '../../assets/icons';
import styles from './NavBar.module.css';

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Controle do menu aberto/fechado

  // Função para alternar o menu
  const handleMenuClick = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.navbarLogo}>
        Portfólio de <span className={styles.navbarHighlight}>Jonathan da Silva Gomes</span>
      </div>

      {/* Botão de menu (aparece apenas em dispositivos menores) */}
      <div className={styles.navbarToggle}>
        <button onClick={handleMenuClick} aria-label="Menu">
          <img
            src={menuOpen ? CloseIcon : MenuIcon}
            alt={menuOpen ? 'Fechar Menu' : 'Abrir Menu'}
            className={styles.icon}
          />
        </button>
      </div>

      {/* Links de navegação */}
      <ul
        className={`${styles.navbarLinks} ${menuOpen ? styles.menuOpen : ''}`}
        role="menu"
      >
        <li>
          <a href="#home" className={styles.navLink}>
            <img src={HomeIcon} alt="Home" className={styles.icon} />
            Home
          </a>
        </li>
        <li>
          <a href="#sobre" className={styles.navLink}>
            <img src={SobreIcon} alt="Sobre" className={styles.icon} />
            Sobre
          </a>
        </li>
        <li>
          <a href="#projetos" className={styles.navLink}>
            <img src={ProjectIcon} alt="Projetos" className={styles.icon} />
            Projetos
          </a>
        </li>
        <li>
          <a href="#contato" className={styles.navLink}>
            <img src={ContactIcon} alt="Contato" className={styles.icon} />
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;