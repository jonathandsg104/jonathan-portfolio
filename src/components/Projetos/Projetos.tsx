import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './Projetos.module.css';
import TrashIcon from '../../assets/icons/trash.png';
import ProjectIcon from '../../assets/icons/project.png'; // Atualizado para project.png
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<Partial<Projeto>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Referência do container

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

  const handleScroll = (direction: 'left' | 'right'): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Define a distância do scroll
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleLogin = async (): Promise<void> => {
    const password = prompt('Digite a senha de administrador:');
    if (!password) {
      alert('Senha não fornecida!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.isAdmin) {
        alert('Login bem-sucedido!');
        setIsAdmin(true);
      } else {
        alert('Senha incorreta!');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      alert('Erro ao autenticar. Tente novamente mais tarde.');
    }
  };

  const handleModalChange = (field: keyof Projeto, value: string): void => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const adicionarProjeto = async (): Promise<void> => {
    const { title, description, url } = newProject;

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
    setShowModal(false); // Fecha o modal após adicionar o projeto
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
      <h1 className={styles.title}>
        <img src={ProjectIcon} alt="Ícone Projetos" className={styles.iconSmall} />
        Meus Projetos
      </h1>

      {!isAdmin && (
        <button onClick={handleLogin} className={styles.loginButton}>
          <img
            src={require('../../assets/icons/login.png')}
            alt="Ícone de Login"
            className={styles.iconSmall}
          />
          Login de Administrador
        </button>
      )}

      {isAdmin && (
        <>
          <button onClick={() => setShowModal(true)} className={styles.addButton}>
            Adicionar Projeto
          </button>

          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalCard}>
                <h2>Adicionar Novo Projeto</h2>
                <input
                  type="text"
                  placeholder="Título"
                  value={newProject.title || ''}
                  onChange={(e) => handleModalChange('title', e.target.value)}
                  className={styles.modalInput}
                />
                <textarea
                  placeholder="Descrição"
                  value={newProject.description || ''}
                  onChange={(e) => handleModalChange('description', e.target.value)}
                  className={styles.modalTextarea}
                ></textarea>
                <input
                  type="url"
                  placeholder="Link (opcional)"
                  value={newProject.url || ''}
                  onChange={(e) => handleModalChange('url', e.target.value)}
                  className={styles.modalInput}
                />
                <div className={styles.modalActions}>
                  <button onClick={adicionarProjeto} className={styles.modalButton}>
                    Confirmar
                  </button>
                  <button onClick={() => setShowModal(false)} className={styles.modalCancel}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {projetos.map((projeto) => (
          <div key={projeto.id} className={styles.card}>
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
            {isAdmin && (
              <button onClick={() => deletarProjeto(projeto.id)} className={styles.deleteButton}>
                <img src={TrashIcon} alt="Deletar" className={styles.iconSmall} />
              </button>
            )}
          </div>
        ))}
      </div>

      {projetos.length > 3 && (
        <div className={styles.scrollButtons}>
          <button
            className={styles.scrollButton}
            onMouseEnter={() => handleScroll('left')}
          >
            &#8249;
          </button>
          <button
            className={styles.scrollButton}
            onMouseEnter={() => handleScroll('right')}
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default Projetos;