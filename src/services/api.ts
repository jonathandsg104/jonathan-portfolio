// Configuração dinâmica da URL da API
const getApiUrl = (): string | null => {
  // Se estiver em desenvolvimento local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // Se estiver acessando via IP local (ex: 192.168.x.x)
  if (window.location.hostname.startsWith('192.168.') || 
      window.location.hostname.startsWith('10.') || 
      window.location.hostname.startsWith('172.')) {
    // Usa o mesmo IP do frontend mas na porta 5000
    return `http://${window.location.hostname}:5000`;
  }
  
  // Em produção (HTTPS), usar dados estáticos por enquanto
  // TODO: Implementar backend em produção com HTTPS
  console.warn('Modo produção: usando dados estáticos para projetos');
  return null; // Indica que deve usar dados estáticos
};

const API_URL = getApiUrl();

// Dados estáticos para produção
const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Beautysaloon',
    description: 'Projeto Web Site para um salão de beleza',
    url: 'https://github.com/jonathansilva/beautysaloon'
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
    // Se não há API_URL (produção), não permite autenticação
    if (!API_URL) {
      console.warn('Autenticação não disponível em produção');
      return false;
    }
    
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
    // Se não há API_URL (produção), retorna dados estáticos
    if (!API_URL) {
      return STATIC_PROJECTS;
    }
    
    try {
      const response = await fetch(`${API_URL}/projetos`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return STATIC_PROJECTS; // Fallback para dados estáticos
    }
  },

  addProject: async (project: Omit<Project, 'id'>): Promise<Project | null> => {
    // Se não há API_URL (produção), não permite adicionar
    if (!API_URL) {
      console.warn('Adição de projetos não disponível em produção');
      return null;
    }
    
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
    // Se não há API_URL (produção), não permite deletar
    if (!API_URL) {
      console.warn('Deleção de projetos não disponível em produção');
      return false;
    }
    
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
