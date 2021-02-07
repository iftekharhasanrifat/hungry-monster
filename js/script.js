const searchByMealName = mealName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}
    `)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0].strMeal;
        const mealImg = data.meals[0].strMealThumb
        const mealDiv = document.createElement('div');
        mealDiv.className = 'food';
        mealDiv.innerHTML = `
            <img src=${mealImg} class="img-thumbnail">
            <h3 id = "mealName">${meal}</h3>
        `;
        document.getElementById("meals").appendChild(mealDiv);        
    })
    .catch(err => {
        alert("Sorry we couldn't find your meal");
    })
}
const searchByMealCategory = mealCategory => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}
    `)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        meals.forEach(meal => {
            const mealName = meal.strMeal;
            searchByMealName(mealName);
        });
    })
    .catch(err => {
        searchByMealName(mealCategory);
    });    
}

const searchByArea = area => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}
    `)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        meals.forEach(meal => {
            const mealName = meal.strMeal;
            searchByMealName(mealName);
        });
    })
    .catch(err => {
        searchByMealCategory(area);
    });    
}
const showMeal = document.createElement('div');
showMeal.id = 'showMeal';
document.getElementById("showArea").appendChild(showMeal);
document.getElementById('meals').addEventListener('click', function(event){
    const getName = event.target.innerText;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getName}`)
    .then(res => res.json())
    .then(data => {
        const mealMeasure1 = data.meals[0].strMeasure1;
        const mealMeasure2 = data.meals[0].strMeasure2;
        const mealMeasure3 = data.meals[0].strMeasure3;
        const mealMeasure4 = data.meals[0].strMeasure4;
        const mealMeasure5 = data.meals[0].strMeasure5;
        const mealIngredient1 = data.meals[0].strIngredient1;
        const mealIngredient2 = data.meals[0].strIngredient2;
        const mealIngredient3 = data.meals[0].strIngredient3;
        const mealIngredient4 = data.meals[0].strIngredient4;
        const mealIngredient5 = data.meals[0].strIngredient5;
        showMeal.innerHTML = `
            <img src = "${data.meals[0].strMealThumb}">
            <h2>${getName}</h2>
            <h3>${mealMeasure1} ${mealIngredient1}</h3>
            <h3>${mealMeasure2} ${mealIngredient2}</h3>
            <h3>${mealMeasure3} ${mealIngredient3}</h3>
            <h3>${mealMeasure4} ${mealIngredient4}</h3>
            <h3>${mealMeasure5} ${mealIngredient5}</h3>
        `;
    });
});

document.getElementById("search-button").addEventListener('click', function(){
    const inputRead = document.getElementById("search-meal-input").value;
    searchByArea(inputRead);
    console.log(inputRead);
    
});