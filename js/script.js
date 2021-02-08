const searchMeal = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    if(searchText ===""){
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = "Aren't you hungry! Please enter a meal name.";
    }
    else{
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayMeal(data.meals);
        }
        catch (error) {
            displayError("Please search your meal properly.");
        }
    }
}

const displayMeal = meals => {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = '';
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';
    const mealInfo = document.getElementById('meal-info');
    mealInfo.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
        <div class="card" style="width: 18rem; border-radius: 15px; overflow: hidden; box-shadow: 10px 10px 30px lightgray;">
            <img src="${meal.strMealThumb}"class="card-img-top" alt="...">
            <div class="card-body" style="cursor: pointer">
                <h5 class="card-title">${meal.strMeal}</h5>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    });
}

document.getElementById('meal-container').addEventListener('click', function (event) {
    const mealName = event.target.innerText;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayIngredient(data.meals))
        .catch(error => displayError('Please try again later'))
})

const displayIngredient = meals => {
    const mealInfo = document.getElementById('meal-info');
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';
    mealInfo.innerHTML = '';
    meals.forEach(meal => {
        if (meals.length === 1) {
            const mealInfoDiv = document.createElement("div");
            mealInfoDiv.innerHTML = `
        <div class=" card" style="width: 18rem;">
            <img src="${meal.strMealThumb}">
            <div class="card-body text-center">
                <h2>${meal.strMeal}</h2>
                <h5>Ingredients</h5>
                <ul>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure1} ${meal.strIngredient1}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure2} ${meal.strIngredient2}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure3} ${meal.strIngredient3}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure4} ${meal.strIngredient4}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure5} ${meal.strIngredient5}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure6} ${meal.strIngredient6}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure7} ${meal.strIngredient7}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure8} ${meal.strIngredient8}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure9} ${meal.strIngredient9}</li>
                    <li style="list-style:none;padding-right:30px;">${meal.strMeasure10} ${meal.strIngredient10}</li>
                </ul> 
            </div>
        </div>
        `;
            mealInfo.appendChild(mealInfoDiv);
        }
        else{
            errorMessage.innerText = "Please click on the meal title";
        }
    });
}
const displayError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}