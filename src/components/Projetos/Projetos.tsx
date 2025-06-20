import React, { FC, useEffect, useState } from 'react';
import styles from './Projetos.module.css';
import { ProjectIcon } from '../../assets/icons';
import { api, Project } from '../../services/api';

const Projetos: FC = () => {
  const [projetos, setProjetos] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getProjects();
      setProjetos(data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      setError('Erro ao carregar projetos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="projetos" className={styles.projetos}>
        <h1 className={styles.title}>
          <img src={ProjectIcon} alt="Ícone Projetos" className={styles.titleIcon} />
          Meus Projetos
        </h1>
        <div className={styles.loading}>Carregando projetos...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projetos" className={styles.projetos}>
        <h1 className={styles.title}>
          <img src={ProjectIcon} alt="Ícone Projetos" className={styles.titleIcon} />
          Meus Projetos
        </h1>
        <div className={styles.error}>{error}</div>
      </section>
    );
  }

  return (
    <section id="projetos" className={styles.projetos}>
      <h1 className={styles.title}>
        <img src={ProjectIcon} alt="Ícone Projetos" className={styles.titleIcon} />
        Meus Projetos
      </h1>

      <div className={styles.projectsGrid}>
        {projetos.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum projeto encontrado.</p>
          </div>
        ) : (
          projetos.map((projeto) => (
            <div 
              key={projeto.id} 
              className={styles.card}
              role="article"
              aria-label={`Projeto: ${projeto.title}`}
            >
              <h2 className={styles.projectTitle}>{projeto.title}</h2>
              <p className={styles.projectDescription}>{projeto.description}</p>
              {projeto.url && (
                <a
                  href={projeto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  Visitar
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export { Projetos };
export default Projetos;
