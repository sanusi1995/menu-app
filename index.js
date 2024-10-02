const apiData = window.recipe.recipe

const searchbutton = document.querySelector(".src_btn");

const container = document.querySelector(".food-items");

const resultContainer = document.getElementById("result");
 
// console.log(resultContainer);

populatePageWithData(apiData);

function populatePageWithData(details) {
    container.innerHTML = '';
    if(details.length > 0) {
        details.forEach((element, index) => {
            createRecipeItem(element, index);
        });
    }
}

function createRecipeItem(element, index){
    const item = document.createElement("div");
    item.classList.add('item');
    item.innerHTML = `
        <div class="img-box">
            <img src=${element.image} alt="">
        </div>
        <h4>${element.foodName}</h4>
        <button class="view-recipe">View Recipe</button>
    `;

    container.appendChild(item);

    const viewRecipeBtn = item.querySelector('.view-recipe');
    viewRecipeBtn.addEventListener('click', () => viewRecipe(index));
}

function searchRecipe() {
    const search = document.querySelector(".src_bar").value.toLowerCase();

    const filteredResults = apiData.filter(recipe => {
        return recipe.foodName.toLowerCase().includes(search);
    });

    container.innerHTML = '';

    if(filteredResults.length === 0) {
        container.innerHTML = "<p>No results found!</p>"
    } else {
        filteredResults.forEach((element, index) => {   
            createRecipeItem(element, index);
        });
    }
}

function viewRecipe(index) {
    console.log(apiData[index]);
    resultContainer.classList.add("open-result");
    resultContainer.innerHTML = `
    <div class="result">
        <button onclick="closeResult()"><i class="fa-solid fa-circle-xmark"></i></button>
        <h2>${apiData[index].foodName}</h2>
        <div class="ingredient">
            <h3>Ingredients</h3>
            <ul>
                ${apiData[index].ingredients.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>
        <div class="instruction">
            <h3>Instructions</h3>
            <ul>
                ${apiData[index].instructions.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>
    </div>
    `
}


function closeResult() {
    resultContainer.classList.remove("open-result");
}


