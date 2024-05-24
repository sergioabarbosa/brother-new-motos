import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

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

test('Verifica se existe um footer com o texto "Brother Motos. Todos os direitos reservados."', () => {
  render(<App />);
  const text = screen.getByText(/Brother Motos. Todos os direitos reservados./i);
  expect(text).toBeInTheDocument();
});

//carrinho de compras
test('Verifica se o carrinho de compras está vazio inicialmente', () => {
  render(<App />);
  const text = screen.getByText(/O carrinho está vazio/i);
  expect(text).toBeInTheDocument();
});

test('Verifica se o botão "Adicionar ao Carrinho" está presente nos cards de produtos', async () => {
  render(<App />);

  // Espera que pelo menos um botão "Adicionar ao Carrinho" esteja presente
  const buttons = await screen.findAllByRole('button', { name: /Adicionar ao Carrinho/i });
  expect(buttons.length).toBeGreaterThan(0);
});

test('Verifica se é possível adicionar um produto ao carrinho de compras', async () => {
  render(<App />);

  // Encontra todos os botões "Adicionar ao Carrinho"
  const buttons = await screen.findAllByRole('button', { name: /adicionar ao carrinho/i });

  // Verifica se há pelo menos um botão "Adicionar ao Carrinho"
  expect(buttons.length).toBeGreaterThan(0);

  // Clica no primeiro botão "Adicionar ao Carrinho"
  fireEvent.click(buttons[0]);

  // Verifica se o texto "O carrinho está vazio" não está mais presente
  const emptyCartText = screen.queryByText(/o carrinho está vazio/i);
  expect(emptyCartText).not.toBeInTheDocument();

  // Opcional: Verifica se o produto foi adicionado ao carrinho
  const cartItem = await screen.findByRole('button', { name: /remover/i });
  expect(cartItem).toBeInTheDocument();
});

