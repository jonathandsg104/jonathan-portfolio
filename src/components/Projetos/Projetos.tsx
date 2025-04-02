import React, { FC, useEffect, useState } from 'react';
import styles from './Projetos.module.css';
import TrashIcon from '../../assets/icons/trash.png';
import { fetchProjects, addProject, deleteProject } from '../../firebaseService';

interface Projeto {
  id: string;
  title: string;
  description: string;
  url?: string;
}

const Projetos: FC = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async (): Promise<void> => {
      try {
        const data = await fetchProjects();
        if (data) {
          setProjetos(Object.keys(data).map((id) => ({ id, ...data[id] })));
        }
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    };

    loadProjects();
  }, []);

  const handleLogin = (): void => {
    const password = prompt('Digite a senha de administrador:');
    if (password === 'Galoplacas2025') {
      alert('Login bem-sucedido!');
      setIsAdmin(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const adicionarProjeto = async (): Promise<void> => {
    const title = prompt('Digite o título do projeto:')?.trim();
    const description = prompt('Digite a descrição do projeto:')?.trim();
    const url = prompt('Digite o link (opcional):')?.trim();

    if (!title || !description) {
      alert('Título e descrição são obrigatórios!');
      return;
    }

    const novoProjeto = { title, description, url };

    try {
      await addProject(novoProjeto);
      alert('Projeto adicionado com sucesso!');
      const data = await fetchProjects();
      if (data) {
        setProjetos(Object.keys(data).map((id) => ({ id, ...data[id] })));
      }
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      alert('Erro ao adicionar projeto.');
    }
  };

  const deletarProjeto = async (id: string): Promise<void> => {
    if (!window.confirm('Tem certeza que deseja deletar este projeto?')) {
      return;
    }

    try {
      await deleteProject(id);
      alert('Projeto deletado com sucesso!');
      setProjetos((prevProjetos) => prevProjetos.filter((projeto) => projeto.id !== id));
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      alert('Erro ao deletar projeto.');
    }
  };

  return (
    <section id="projetos" className={styles.projetos}>
      <h1 className={styles.title}>Meus Projetos</h1>

      {!isAdmin && (
        <button onClick={handleLogin} className={styles.loginButton}>
          Login de Administrador
        </button>
      )}

      {isAdmin && (
        <button onClick={adicionarProjeto} className={styles.addButton}>
          Adicionar Projeto
        </button>
      )}

      <div className={styles.grid}>
        {projetos.map((projeto) => (
          <div key={projeto.id} className={styles.card}>
            <h2 className={styles.projectTitle}>{projeto.title}</h2>
            <p className={styles.projectDescription}>{projeto.description}</p>
            {projeto.url && (
              <a href={projeto.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                Visitar
              </a>
            )}
            {isAdmin && (
              <button
                onClick={() => deletarProjeto(projeto.id)}
                className={styles.deleteButton}
              >
                <img src={TrashIcon} alt="Deletar" className={styles.iconSmall} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projetos;