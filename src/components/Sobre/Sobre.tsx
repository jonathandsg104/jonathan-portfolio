import React, { FC } from 'react';
import { SobreIcon } from '../../assets/icons';
import FormacaoIcon from '../../assets/icons/formacao.png';
import ExperienciaIcon from '../../assets/icons/experiencia.png';
import CertificadosIcon from '../../assets/icons/certificados.png';
import HabilidadesIcon from '../../assets/icons/habilidades.png';
import CardIcon from '../../assets/icons/card.png';
import styles from './Sobre.module.css';

const Sobre: FC = () => {
  return (
    <section id="sobre" className={styles.sobre}>
      {/* Seção Sobre Mim */}
      <h1 className={styles.title}>
        <img src={SobreIcon} alt="Sobre Mim" className={styles.icon} />
        Sobre Mim
      </h1>
      <div className={styles.card}>
        <p>
          Sou um profissional formado em Tecnologia da Informação e Comunicação, com experiência em funções administrativas e operacionais. Estou em transição para a área de desenvolvimento, com foco em programação web e mobile, especialmente em tecnologias como JavaScript, React, Node.js, TypeScript e React Native.
        </p>
        <p>
          Tenho habilidades em comunicação eficaz, trabalho em equipe e resolução de problemas. Sou altamente motivado a aplicar meus conhecimentos em projetos de desenvolvimento de software, contribuindo para a inovação e crescimento das empresas.
        </p>
      </div>

      {/* Seção Habilitação (CNH) */}
      <h2 className={styles.subtitle}>
        <img src={CardIcon} alt="Habilitação" className={styles.icon} />
        Habilitação
      </h2>
      <div className={styles.card}>
        <ul>
          <li><strong>Categoria:</strong> A e B</li>
        </ul>
      </div>

      {/* Seção Formação Acadêmica */}
      <h2 className={styles.subtitle}>
        <img src={FormacaoIcon} alt="Formação Acadêmica" className={styles.icon} />
        Formação Acadêmica
      </h2>
      <div className={styles.card}>
        <ul>
          <li><strong>Tecnologia da Informação e Comunicação</strong> - Universidade Federal de Santa Catarina (UFSC) | Concluído em 2019</li>
          <li><strong>Ciência da Computação</strong> (Incompleto) - Universidade do Extremo Sul Catarinense (UNESC)</li>
        </ul>
      </div>

      {/* Seção Experiência Profissional */}
      <h2 className={styles.subtitle}>
        <img src={ExperienciaIcon} alt="Experiência Profissional" className={styles.icon} />
        Experiência Profissional
      </h2>
      <div className={styles.card}>
        <h3>Proprietário - Galo Placas Veiculares Ltda</h3>
        <p className={styles.date}>Jacinto Machado-SC | Agosto 2022 - Atual</p>
        <ul>
          <li>Gestão administrativa e operacional da empresa, assegurando o cumprimento de prazos e metas.</li>
          <li>Coordenação de vendas, estoque e entregas de produtos.</li>
          <li>Planejamento financeiro, controle de fluxo de caixa e estratégias de investimento.</li>
        </ul>

        <h3>Estampador - Schmidt Placas e Lacres para Veículos</h3>
        <p className={styles.date}>Agosto 2020 - Agosto 2022</p>
        <ul>
          <li>Gerenciamento e operação do sistema de emplacamento de veículos.</li>
          <li>Comunicação corporativa e coordenação entre departamentos e clientes.</li>
          <li>Apoio nas atividades financeiras e controle de estoque.</li>
        </ul>

        <h3>Auxiliar Administrativo - Comércio de Pedras Araçá</h3>
        <p className={styles.date}>Novembro 2011 - Julho 2020</p>
        <ul>
          <li>Coordenação de atividades administrativas e controle de documentos.</li>
          <li>Atendimento ao cliente e suporte nas operações logísticas.</li>
          <li>Organização de cargas e controle de entrada e saída.</li>
        </ul>
      </div>

      {/* Seção Cursos Complementares */}
      <h2 className={styles.subtitle}>
        <img src={CertificadosIcon} alt="Cursos Complementares" className={styles.icon} />
        Cursos Complementares
      </h2>
      <div className={styles.card}>
        <ul>
          <li>Fullstack JavaScript | OneBitcode | 2022</li>
        </ul>
      </div>

      {/* Seção Habilidades */}
      <h2 className={styles.subtitle}>
        <img src={HabilidadesIcon} alt="Habilidades" className={styles.icon} />
        Habilidades
      </h2>
      <div className={styles.card}>
        <ul>
          <li>Desenvolvimento em JavaScript</li>
          <li>Criação de interfaces com React</li>
          <li>Programação para dispositivos móveis com React Native</li>
          <li>Desenvolvimento de backend com Node.js</li>
          <li>Manipulação de bancos de dados com SQL</li>
        </ul>
      </div>
    </section>
  );
};

export { Sobre };
export default Sobre;
