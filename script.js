async function loadMeals() {
      try {
        const res = await fetch('db.json');
        const data = await res.json();
        displayMeals(data.meals);
      } catch (error) {
        console.error("Error loading meals:", error);
      }
    }

    function displayMeals(meals) {
      const container = document.getElementById('mealsContainer');
      container.innerHTML = '';

      meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'meal-card';

        card.innerHTML = `
          <h2>${meal.name}</h2>
          <p><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> ${meal.instructions}</p>
        `;

        container.appendChild(card);
      });
    }

    document.getElementById('searchInput').addEventListener('input', async (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const res = await fetch('db.json');
      const data = await res.json();
      const filteredMeals = data.meals.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm)
      );
      displayMeals(filteredMeals);
    });

    loadMeals();