import React, { useState, useEffect, FormEvent } from 'react';
import ReactPaginate from 'react-paginate';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './App.css';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
}

const ITEMS_PER_PAGE = 30;

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>('');

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=motocicleta`);
        const data = await response.json();
        const initialProducts = data.results.slice(0, ITEMS_PER_PAGE);
        setResults(initialProducts);
        const totalResults = data.results.length;
        const pages = Math.ceil(totalResults / ITEMS_PER_PAGE);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error fetching initial products:', error);
      }
    };

    fetchInitialProducts();
  }, []);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      const data = await response.json();
      const searchResults = data.results.slice(0, ITEMS_PER_PAGE);
      setResults(searchResults);
      const totalResults = data.results.length;
      const pages = Math.ceil(totalResults / ITEMS_PER_PAGE);
      setTotalPages(pages);
      setCurrentPage(0);
      setCurrentQuery(query);
    } catch (error) {
      console.error('Error fetching data from Mercado Livre API:', error);
    }
  };

  const handlePageChange = async (selectedItem: { selected: number }) => {
    const offset = selectedItem.selected * ITEMS_PER_PAGE;
    setCurrentPage(selectedItem.selected);
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${currentQuery}&offset=${offset}`);
      const data = await response.json();
      const pageResults = data.results.slice(0, ITEMS_PER_PAGE);
      setResults(pageResults);
    } catch (error) {
      console.error('Error fetching data from Mercado Livre API:', error);
    }
  };

  return (
    <div id="root">
      <header className="banner">
        <h1>Bem-vindo a Brother Motos!</h1>
        <p>Confira nossas promoções e ofertas exclusivas!</p>
        <div className="social-icons">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </header>
      <h1 className="title">Buscar no Mercado Livre</h1>
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produtos..."
          className="input"
        />
        <button type="submit" className="button" disabled={!query.trim().length}>Buscar</button>
      </form>
      <div className="card-container">
        {results.map((item) => (
          <div key={item.id} className="card">
            <h2 className="productTitle">{item.title}</h2>
            <img src={item.thumbnail} alt={item.title} className="image" />
            <p className="productPrice">Preço: R$ {item.price}</p>
          </div>
        ))}
      </div>
      {query && totalPages > 1 && (
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próxima'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currentPage}
        />
      )}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Brother Motos. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
