import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Adicione "connectDatabaseEmulator"

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwNM-1_otHyraus5iaYRhHwqOuBTeRH_0",
  authDomain: "my-project-portifolio-1d23e.firebaseapp.com",
  databaseURL: "https://my-project-portifolio-1d23e-default-rtdb.firebaseio.com",
  projectId: "my-project-portifolio-1d23e",
  storageBucket: "my-project-portifolio-1d23e.firebasestorage.app",
  messagingSenderId: "617659006671",
  appId: "1:617659006671:web:6a47bc4e7a63016215c1ba",
  measurementId: "G-RX3ZN0LJ5N",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Conectar ao Realtime Database Emulator
connectDatabaseEmulator(db, "127.0.0.1", 9000); // Redireciona para o emulador na porta 9000

export default db;