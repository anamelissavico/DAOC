// header.js
import { showSection } from './utils.js'; 
import { renderProducts, allProducts } from './products.js';

export function renderHeader(loadFavoritesCallback) {
  const header = document.getElementById('app-header');

  header.innerHTML = `
    <div class="header-container">
      <h1>FakeStore</h1>
      <nav>
        <button id="nav-products">Produtos</button>
        <button id="nav-favorites">Favoritos</button>
        <button id="toggle-theme">🌙 Tema</button>
      </nav>
      <div class="filters">
        <select id="category-filter">
          <option value="">Todas as Categorias</option>
          <option value="men's clothing">Roupas Masculinas</option>
          <option value="women's clothing">Roupas Femininas</option>
          <option value="jewelery">Joias</option>
          <option value="electronics">Eletrônicos</option>
        </select>
        <label for="price-filter">Preço máximo:</label>
        <input type="range" id="price-filter" min="0" max="1000" step="10" value="1000">
        <span id="price-value">R$1000</span>
      </div>
    </div>
  `;

  // Navegação SPA
  document.getElementById('nav-products').addEventListener('click', () => {
    showSection('products'); 
    renderProducts(allProducts);
  });

  document.getElementById('nav-favorites').addEventListener('click', () => {
    showSection('favorites');
    loadFavoritesCallback();           
  });

  // Toggle tema
  const toggleBtn = document.getElementById('toggle-theme');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '☀️ Tema';
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '🌙 Tema';
    }
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    toggleBtn.textContent = '☀️ Tema';
  } else {
    document.body.classList.remove('dark-theme');
    toggleBtn.textContent = '🌙 Tema';
  }

  // Filtros
  const categorySelect = document.getElementById('category-filter');
  const priceRange = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');

  priceRange.addEventListener('input', () => {
    priceValue.textContent = `R$${priceRange.value}`;
  });

  function applyFilters() {
    const filtered = allProducts.filter(p => {
      const matchCategory = categorySelect.value === '' || p.category === categorySelect.value;
      const matchPrice = p.price <= Number(priceRange.value);
      return matchCategory && matchPrice;
    });
    renderProducts(filtered);
  }

  categorySelect.addEventListener('change', applyFilters);
  priceRange.addEventListener('change', applyFilters);
}
