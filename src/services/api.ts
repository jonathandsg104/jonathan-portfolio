const API_URL = 'http://localhost:5000';

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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
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
      return response.ok;
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      return false;
    }
  },
};
