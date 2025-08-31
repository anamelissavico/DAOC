// utils.js

/**

 * @param {string} section - 'products' ou 'favorites'
 */
export function showSection(section) {
  const products = document.getElementById('products-section');
  const favorites = document.getElementById('favorites-section');

  if (section === 'products') {
    products.style.display = 'grid';
    favorites.style.display = 'none';
  } else if (section === 'favorites') {
    favorites.style.display = 'grid';
    products.style.display = 'none';
  }
}

/**
 
 * @param {Array} products 
 * @param {string} searchTerm 
 * @returns {Array} 
 */
export function filterProducts(products, searchTerm) {
 
  return products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

/**
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
