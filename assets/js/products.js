// products.js
import { createProductCard } from './card.js';

export let allProducts = [];

const productsSection = document.getElementById('products-section');

const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.innerHTML = `
  <div class="loading-spinner"></div>
  <p>Carregando produtos...</p>
`;

export function renderProducts(products) {
  productsSection.innerHTML = '';
  if (products.length === 0) {
    productsSection.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }
  products.forEach(product => {
    const card = createProductCard(product);
    productsSection.appendChild(card);
  });
}

export async function fetchProducts() {
  productsSection.innerHTML = '';
  productsSection.appendChild(loadingDiv);

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    allProducts = data;
    renderProducts(allProducts); // chama a função exportada
  } catch (error) {
    productsSection.innerHTML = '<p>Erro ao carregar produtos.</p>';
    console.error(error);
  }
}
