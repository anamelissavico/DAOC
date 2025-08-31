// main.js
import { renderHeader } from './header.js';
import { fetchProducts, allProducts } from './products.js';
import { createProductCard } from './card.js';
import { filterProducts, showSection } from './utils.js';

// Seleciona seções principais
const productsSection = document.getElementById('products-section');
const favoritesSection = document.getElementById('favorites-section');

// Função para renderizar produtos em cards
function renderProductsList(products) {
  productsSection.innerHTML = '';
  if (products.length === 0) {
    productsSection.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }
  products.forEach(prod => {
    const card = createProductCard(prod);
    productsSection.appendChild(card);
  });
}

// Renderiza produtos favoritos
export function loadFavorites() {
  favoritesSection.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.length === 0) {
    favoritesSection.innerHTML = '<p>Você ainda não favoritou nenhum produto.</p>';
    return;
  }
  favorites.forEach(prod => {
    const card = createProductCard(prod);
    favoritesSection.appendChild(card);
  });
}

// Cria input de busca dinamicamente
const searchContainer = document.createElement('div'); 
searchContainer.classList.add('search-container');

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Buscar produto...';
searchInput.classList.add('search-input');

searchContainer.appendChild(searchInput);
productsSection.parentNode.insertBefore(searchContainer, productsSection);

// Filtra produtos conforme digita
searchInput.addEventListener('input', () => {
  const filtered = filterProducts(allProducts, searchInput.value);
  renderProductsList(filtered);
});

// Inicializa header passando a função loadFavorites
renderHeader(loadFavorites);

// Inicializa a aplicação
showSection('products');
fetchProducts();
