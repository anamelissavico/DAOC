// card.js
import { toggleFavorite, isFavorite } from './favorites.js';

/**

 * @param {Object} produto 
 * @returns {HTMLElement} 
 */
export function createProductCard(produto) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${produto.image}" alt="${produto.title}" class="product-image">
    <h3 class="product-title">${produto.title}</h3>
    <p class="product-price">R$ ${produto.price.toFixed(2)}</p>
    <button class="favorite-btn">${isFavorite(produto.id) ? '💖' : '🤍'}</button>
  `;

  
  const favBtn = card.querySelector('.favorite-btn');

  
  favBtn.addEventListener('click', () => {
    toggleFavorite(produto);
    favBtn.textContent = isFavorite(produto.id) ? '💖' : '🤍';
  });

  return card;
}
