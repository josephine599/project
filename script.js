// async function loadMeals() {
//       try {
//         const res = await fetch('db.json');
//         const data = await res.json();
//         displayMeals(data.meals);
//       } catch (error) {
//         console.error("Error loading meals:", error);
//       }
//     }

//     function displayMeals(meals) {
//       const container = document.getElementById('mealsContainer');
//       container.innerHTML = '';

//       meals.forEach(meal => {
//         const card = document.createElement('div');
//         card.className = 'meal-card';

//         card.innerHTML = `
//           <h2>${meal.name}</h2>
//           <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
//           <p><strong>Instructions:</strong> ${meal.instructions}</p>
//         `;

//         container.appendChild(card);
//       });
//     }

//     document.getElementById('searchInput').addEventListener('input', async (e) => {
//       const searchTerm = e.target.value.toLowerCase();
//       const res = await fetch('db.json');
//       const data = await res.json();
//       const filteredMeals = data.meals.filter(meal =>
//         meal.name.toLowerCase().includes(searchTerm)
//       );
//       displayMeals(filteredMeals);
//     });

//     loadMeals();

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

  meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
      <h2>${meal.name}</h2>
      <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> ${meal.instructions}</p>
    `;

    // Event 3: Mouseover (highlight console log)
    card.addEventListener('mouseover', () => {
      console.log(`Hovered over ${meal.name}`);
    });

    container.appendChild(card);
  });
}

// Event 1: Search Input
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredMeals = allMeals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm)
  );
  displayMeals(filteredMeals);
});

// Event 2: Toggle Theme
document.getElementById('toggleTheme').addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  document.getElementById('toggleTheme').textContent = darkMode ? " Light Mode" : "Dark Mode";
});

loadMeals();
