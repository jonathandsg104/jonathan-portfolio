// Usar proxy configurado no package.json para desenvolvimento
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

// Dados estáticos para produção
const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Beautysaloon',
    description: 'Projeto Web Site para um salão de beleza',
    url: 'https://github.com/jonathandsg104'
  },
  {
    id: '2',
    title: 'Meu Portfólio',
    description: 'Site com meu currículo e ChatBot.',
    url: 'https://jonathanportifolio.com.br'
  }
];

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
}

export const api = {
  auth: async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      return data.isAdmin;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return false;
    }
  },

  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_URL}/projetos`);
      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return STATIC_PROJECTS; // Fallback para dados estáticos
    }
  },

  addProject: async (project: Omit<Project, 'id'>): Promise<Project | null> => {
    try {
      const response = await fetch(`${API_URL}/projetos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na resposta: ${response.status} - ${text}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      return null;
    }
  },

  deleteProject: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/projetos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro na resposta: ${response.status} - ${text}`);
      }
      return true;
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      return false;
    }
  },
};
