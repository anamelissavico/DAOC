// favorites.js

const FAVORITES_KEY = 'favorites';

/**
 * Retorna a lista de produtos favoritos do localStorage
 * @returns {Array} Array de produtos
 */
export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**

 * @param {Array} favorites 
 */
export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**

 * @param {number} id 
 * @returns {boolean} 
 */
export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(prod => prod.id === id);
}

/**
 * @param {Object} produto - Objeto do produto
 */
export function toggleFavorite(produto) {
  let favorites = getFavorites();

  if (isFavorite(produto.id)) {
    favorites = favorites.filter(prod => prod.id !== produto.id);
  } else {
    favorites.push(produto);
  }

  saveFavorites(favorites);
}
