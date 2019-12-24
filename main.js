const meal_button = document.getElementById('get-meal');
const meal_container = document.getElementById('meal-container');

meal_button.addEventListener('click', async () => {
    await getMeal();
});

const getRandomMeal = async () => {
    const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    return (await mealResponse.json()).meals[0];
}

const getFormattedMealHtml = (meal) => {
    let html = `
        <h2>${meal.strMeal}</h2>
        <h3 class="category">${meal.strCategory} · ${meal.strArea}</h3>
        <img src='${meal.strMealThumb}' />
    `;
    for (let i = 1; i <= 20; i++) {
        if (i === 1 && meal[`strIngredient${i}`]) {
            html += '<div class="recipe"><div class="container"><h3 class="recipe-header">Recipe</h3><ol>'
        }
        if (meal[`strIngredient${i}`]) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            html += `
                <li><span class="ingredient">${ingredient}</span><span class="measure"> : ${measure}</span> </li>
            `;
        }
        if (i === 20) {
            html+= '</ol>';
        }
    }
    const videoID = meal.strYoutube.substring(meal.strYoutube.indexOf('v=') + 2);
    console.log(videoID);
    html += `
            <h3>Instructions</h3>
            <div>${meal.strInstructions}</div>
        </div>
        <div class="video">
            <iframe width="90%" height="500px" src="https://www.youtube.com/embed/${videoID}"></iframe>
        </div>
        </div>
    `;
    return html;
}

async function getMeal() {
    const meal = await getRandomMeal();
    const html = getFormattedMealHtml(meal);
    meal_container.innerHTML = html;
}

getMeal();
