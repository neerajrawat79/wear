const API_URL = "https://fakestoreapi.com/products";
let products = [];
let filteredProducts = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 9;

// Elements
const productGrid = document.getElementById("product-grid");
const loadMoreButton = document.getElementById("load-more");
const searchBar = document.getElementById("search-bar");
const sortOptions = document.getElementById("sort-options");
const filterInputs = document.querySelectorAll(".filter-category input");

// Fetch Products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    products = await response.json();
    filteredProducts = products; // Initially, all products are displayed
    renderProducts();
  } catch (error) {
    productGrid.innerHTML =
      "<p>Error fetching products. Please try again later.</p>";
  }
}

// Render Products
function renderProducts() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = currentPage * ITEMS_PER_PAGE;
  const items = filteredProducts.slice(start, end);

  items.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-details">
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <span class="heart-icon">❤️</span>
      </div>
    `;
    productGrid.appendChild(productCard);
  });

  if (end >= filteredProducts.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
}

// Clear Product Grid
function clearProductGrid() {
  productGrid.innerHTML = "";
}

// Apply Filters
function applyFilters() {
  const selectedCategories = Array.from(filterInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (selectedCategories.length > 0) {
    filteredProducts = products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  } else {
    filteredProducts = products; // Show all products if no category is selected
  }

  clearProductGrid();
  currentPage = 1;
  renderProducts();
}

// Event Listeners
loadMoreButton.addEventListener("click", () => {
  currentPage++;
  renderProducts();
});

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  clearProductGrid();
  currentPage = 1;
  renderProducts();
});

sortOptions.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  clearProductGrid();
  currentPage = 1;
  renderProducts();
});

//Product count
// Elements
const resultsCount = document.getElementById("product-count");

// Function to update results count
function updateResultsCount() {
  resultsCount.textContent = filteredProducts.length;
}

// Modify applyFilters to include the results count update
function applyFilters() {
  const selectedCategories = Array.from(filterInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (selectedCategories.length > 0) {
    filteredProducts = products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  } else {
    filteredProducts = products; // Show all products if no category is selected
  }

  clearProductGrid();
  currentPage = 1;
  updateResultsCount(); // Update results count
  renderProducts();
}

// Modify search and sort to include results count update
searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  clearProductGrid();
  currentPage = 1;
  updateResultsCount(); // Update results count
  renderProducts();
});

sortOptions.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  clearProductGrid();
  currentPage = 1;
  updateResultsCount(); // Update results count
  renderProducts();
});

// Add filter input event listeners
filterInputs.forEach((input) => {
  input.addEventListener("change", applyFilters);
});

document.addEventListener("DOMContentLoaded", () => {
  const filterToggle = document.getElementById("filter-toggle");
  const filterPanel = document.getElementById("filter-panel");
  const filterClose = document.getElementById("filter-close");

  // Open filter panel
  filterToggle.addEventListener("click", () => {
    filterPanel.classList.add("open");
  });

  // Close filter panel
  filterClose.addEventListener("click", () => {
    filterPanel.classList.remove("open");
  });
});

// Initialize results count after fetching products
fetchProducts().then(updateResultsCount);
