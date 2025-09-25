let allMeals = [];
let darkMode = false;

async function loadMeals() {
  try {
    const res = await fetch('db.json');
    const data = await res.json();
    allMeals = data.meals;
    displayMeals(allMeals);
  } catch (error) {
    console.error("Error loading meals:", error);
    document.getElementById('mealsContainer').innerHTML = `<p>Failed to load meals.</p>`;
  }
}

function displayMeals(meals) {
  const container = document.getElementById('mealsContainer');
  container.innerHTML = '';

  if (meals.length === 0) {
    container.innerHTML = `<p>No meals found.</p>`;
    return;
  }

  meals.forEach((meal, index) => {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="meal-image">
      <h2>${meal.name}</h2>
      <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> ${meal.instructions}</p>
      <button class="delete-btn">❌ Delete</button>
    `;

    card.addEventListener('mouseover', () => {
      console.log(`Hovered over ${meal.name}`);
    });

    card.querySelector('.delete-btn').addEventListener('click', () => {
      allMeals.splice(index, 1);
      displayMeals(allMeals);
      saveMealsToLocalStorage();
    });

    container.appendChild(card);
  });
}

// Search Filter
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredMeals = allMeals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm)
  );
  displayMeals(filteredMeals);
});

// Toggle Dark Mode
document.getElementById('toggleTheme').addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  document.getElementById('toggleTheme').textContent = darkMode ? " Light Mode" : "Dark Mode";
});

// Add Meal
document.getElementById('addMealForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('mealNameInput').value.trim();
  const ingredients = document.getElementById('mealIngredientsInput').value.trim().split(',');
  const instructions = document.getElementById('mealInstructionsInput').value.trim();
  const image = document.getElementById('mealImageInput').value.trim() || "https://via.placeholder.com/150";

  if (name && ingredients.length > 0 && instructions) {
    const newMeal = { name, ingredients, instructions, image };
    allMeals.push(newMeal);
    displayMeals(allMeals);
    saveMealsToLocalStorage();

    e.target.reset();
  }
});

// Save to Local Storage
function saveMealsToLocalStorage() {
  localStorage.setItem('meals', JSON.stringify(allMeals));
}

// Load from Local Storage
function loadMealsFromLocalStorage() {
  const savedMeals = localStorage.getItem('meals');
  if (savedMeals) {
    allMeals = JSON.parse(savedMeals);
    displayMeals(allMeals);
    return true;
  }
  return false;
}

// Initialize Meals
if (!loadMealsFromLocalStorage()) {
  loadMeals();
}

// ===== Slides Functionality =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideSection = document.querySelector('.slides');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  if (index >= slides.length) {
    slideSection.style.display = "none";
  }
}

document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    slideSection.style.display = "none";
  } else {
    showSlide(currentSlide);
  }
});

document.getElementById('prevSlide').addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
});
