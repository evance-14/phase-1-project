let result =document.getElementById("result");
let searchButton = document.getElementById("searchButton");
let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
let userInput = document.getElementById("user-input").value;
if (userInput.length ==0){
    result.innerHTML = `<h3 class="msg">input field cannot be empty</h3>`;
}else{
    fetch(url + userInput)
    .then(response =>response.json())
    .then(data =>{
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);

        let count =1;
        let ingredients =[];
        for (let i in myDrink){
            let ingredient="";
            let measure ="";
            if(i.startsWith("strIngredient") && myDrink[i]){
                ingredient = myDrink[i];
                if(myDrink[`strMeasure` + count]){
                    measure = myDrink[`strMeasure` + count];
                }else{
                    measure = "";
                }
                count +=1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);
        result.innerHTML =`
        <img src=${myDrink.strDrinkThumb}>
        <h2>${myDrink.strDrink}</h2>
        <h3>Ingredients:</h3>
        <ul class ="ingredients"></ul>
        <h3>Instructions:</h3>
        <p>${myDrink.strInstructions}</p>
        `;
        
    });
}
