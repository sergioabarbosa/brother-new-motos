import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('Verifica se a página renderiza o texto "Bem-vindo a Brother Motos!"', () => {
  render(<App />);
  const text = screen.getByText(/Bem-vindo a Brother Motos!/i);
  expect(text).toBeInTheDocument();
});

test('Verifica se a página renderiza o texto "Confira nossas promoções e ofertas exclusivas!"', () => {
  render(<App />);
  const text = screen.getByText(/Confira nossas promoções e ofertas exclusivas!/i);
  expect(text).toBeInTheDocument();
});

test('Verifica se a página renderiza o texto "Digite o que você procura"', () => {
  render(<App />);
  const placeholder = screen.getByPlaceholderText(/Buscar produtos.../i);
  expect(placeholder).toBeInTheDocument();
});

test('Verifica se a página renderiza o botão "Buscar"', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /buscar/i });
  expect(button).toBeInTheDocument();
});

test('Verifica se renderiaz um botão de busca', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /buscar/i });
  expect(button).toBeInTheDocument();
});

test('Verifica se renderiza um input de texto', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('Verifica se o input de texto está vazio inicialmente', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

test('Verifica se o input de texto aceita digitação', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'motos' } });
  expect(input).toHaveValue('motos');
});

test('Verifica se o botão de busca está desabilitado quando o input de texto está vazio', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /buscar/i });
  expect(button).toBeDisabled();
});

test('Verifica se o botão de busca está habilitado quando o input de texto está preenchido', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /buscar/i });
  fireEvent.change(input, { target: { value: 'motos' } });
  expect(button).toBeEnabled();
});


