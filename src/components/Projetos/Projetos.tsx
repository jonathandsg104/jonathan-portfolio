import React, { FC, useEffect, useState } from 'react';
import styles from './Projetos.module.css';
import { ProjectIcon, TrashIcon, LoginIcon } from '../../assets/icons';
import { api, Project } from '../../services/api';

const Projetos: FC = () => {
  const [projetos, setProjetos] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    url: ''
  });

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

  const handleLogin = async (): Promise<void> => {
    if (!loginPassword.trim()) {
      alert('Por favor, digite a senha!');
      return;
    }

    try {
      const isAdmin = await api.auth(loginPassword);
      if (isAdmin) {
        alert('Login bem-sucedido!');
        setIsAdmin(true);
        setShowLoginModal(false);
        setLoginPassword('');
      } else {
        alert('Senha incorreta!');
        setLoginPassword('');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      alert('Erro ao autenticar. Tente novamente mais tarde.');
    }
  };

  const openLoginModal = (): void => {
    setShowLoginModal(true);
  };

  const closeLoginModal = (): void => {
    setShowLoginModal(false);
    setLoginPassword('');
  };

  const handleModalChange = (field: keyof Omit<Project, 'id'>, value: string): void => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const adicionarProjeto = async (): Promise<void> => {
    const { title, description } = newProject;

    if (!title || !description) {
      alert('Título e descrição são obrigatórios!');
      return;
    }

    try {
      const projeto = await api.addProject(newProject);
      if (projeto) {
        alert('Projeto adicionado com sucesso!');
        await loadProjects();
        setNewProject({ title: '', description: '', url: '' });
        setShowModal(false);
      } else {
        throw new Error('Erro ao adicionar projeto');
      }
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      alert('Erro ao adicionar projeto. Tente novamente mais tarde.');
    }
  };

  const deletarProjeto = async (id: string): Promise<void> => {
    if (!window.confirm('Tem certeza que deseja deletar este projeto?')) {
      return;
    }

    try {
      const success = await api.deleteProject(id);
      if (success) {
        alert('Projeto deletado com sucesso!');
        setProjetos((prev) => prev.filter((projeto) => projeto.id !== id));
      } else {
        throw new Error('Erro ao deletar projeto');
      }
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      alert('Erro ao deletar projeto. Tente novamente mais tarde.');
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

      {!isAdmin && (
        <button onClick={openLoginModal} className={styles.loginButton}>
          <img src={LoginIcon} alt="" className={styles.iconSmall} aria-hidden="true" />
          Login de Administrador
        </button>
      )}

      {showLoginModal && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <h2>Login de Administrador</h2>
            <input
              type="password"
              placeholder="Digite a senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={styles.modalInput}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button onClick={handleLogin} className={styles.modalButton}>
                Entrar
              </button>
              <button onClick={closeLoginModal} className={styles.modalCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
                  value={newProject.title}
                  onChange={(e) => handleModalChange('title', e.target.value)}
                  className={styles.modalInput}
                />
                <textarea
                  placeholder="Descrição"
                  value={newProject.description}
                  onChange={(e) => handleModalChange('description', e.target.value)}
                  className={styles.modalTextarea}
                />
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
              {isAdmin && (
                <button 
                  onClick={() => deletarProjeto(projeto.id)} 
                  className={styles.deleteButton}
                  aria-label={`Deletar projeto ${projeto.title}`}
                >
                  <img src={TrashIcon} alt="" className={styles.iconSmall} aria-hidden="true" />
                </button>
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
