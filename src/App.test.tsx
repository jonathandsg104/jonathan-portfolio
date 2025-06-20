import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main sections', () => {
  render(<App />);
  // Verifica se os principais títulos estão presentes
  expect(screen.getByText(/Bem-vindo ao Meu Portfólio/i)).toBeInTheDocument();
  // Usa getAllByText para múltiplos elementos e verifica se pelo menos um está presente
  expect(screen.getAllByText(/Jonathan da Silva Gomes/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Projetos Concluídos/i)).toBeInTheDocument();
});
