import { ref, get, push, set, remove } from "firebase/database";
import db from "./firebaseConfig";

// Buscar todos os projetos (GET)
export const fetchProjects = async () => {
  try {
    const projectsRef = ref(db, "projetos");
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Retorna os projetos se existirem
    }
    return null; // Retorna null se o nó não existir
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};

// Adicionar um novo projeto (POST)
export const addProject = async (newProject) => {
  try {
    const projectsRef = ref(db, "projetos");
    const newProjectRef = push(projectsRef);
    await set(newProjectRef, newProject); // Alinha com o padrão atualizado do Firebase
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    throw error;
  }
};

// Deletar um projeto pelo ID (DELETE)
export const deleteProject = async (projectId) => {
  try {
    const projectRef = ref(db, `projetos/${projectId}`);
    await remove(projectRef); // Remove o nó do banco
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};