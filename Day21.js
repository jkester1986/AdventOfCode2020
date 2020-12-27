fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		foods = [];
	
	let smallestSize;
	lines.forEach((line, i) => {
		let match = /^(.*)\(contains (.+)\)(.*)$/.exec(line);
		let food;
		if(match) {
			let ingredients = match[1].trim();
			if (match[3]) ingredients += ' ' + match[3].trim();
			ingredients = new Set(ingredients.split(' '));
			food = {
				ingredients,
				allergens: new Set(match[2].split(/,?\s/))
			};
			foods.push(food);
		}
		else {
			let ingredients = new Set(line.split(' '));
			food = {ingredients};
			foods.push(food);
		}
		if (!smallestSize || food.ingredients.length < smallestSize.ingredients.length) smallestSize = food;
	});

	foods = foods.sort((a, b) => a.allergens.size - b.allergens.size);
	// console.log(foods);

	let foodsSize = foods.length,//do I need this?
		possibleSafeIngredients = new Set();

	while (!allergensAllFound(foods)) {
		// console.log("foods before shift:", foods);
		let {ingredients: currentIngredients, allergens: currentAllergens} = foods.shift();
		// console.log("current food:", {currentIngredients, currentAllergens});
		// console.log("foods after shift:", foods);

		if (currentAllergens.size === 1) {

			let allergen = currentAllergens.values().next().value;

			let overlappingIngredients = new Set(currentIngredients)
				foodsLength = foods.length;
			if (currentIngredients.length === 1) {
				// do nothing, we've already found it
				overlappingIngredients = new Set(currentIngredients);
			}
			else {
				for (let j = 0; j < foodsLength; j++) {

					let newIngredientSet = new Set();
					// if one of the foods has the allergen
					if (foods[j].allergens.has(allergen)) {
						// check all the ingredients in the current food
						overlappingIngredients.forEach(ingredient => {
							if (foods[j].ingredients.has(ingredient)) newIngredientSet.add(ingredient);
							else possibleSafeIngredients.add(ingredient);
						});
						overlappingIngredients = new Set(newIngredientSet);
	
						if (overlappingIngredients.size === 1) {
							// allergen found!
							break;
						}
					}
				}
			}

			// if there's only one ingredient
			if (overlappingIngredients.size === 1) {

				foods.forEach(food => {
					food.allergens.delete(allergen);
					let iterator = overlappingIngredients.values();
					let ingredient = iterator.next().value;
					// console.log({food});
					food.ingredients.delete(ingredient);
					possibleSafeIngredients.delete(ingredient);

					if(food.allergens.size === 0) {
						food.ingredients.forEach(ing => possibleSafeIngredients.add(ing));
					}
				});

				let newAllergen = new Set();
				newAllergen.add(allergen);

				foods.push({
					allergens: newAllergen,
					ingredients: overlappingIngredients
				});
			}
			else {
				foods.push({
					ingredients: overlappingIngredients,
					allergens: currentAllergens
				});
			}
		}
		else {
			foods.push({
				ingredients: currentIngredients,
				allergens: currentAllergens
			});
		}
		// console.log("foods after push:", foods);
		// process.exit();
	}

	// do some cleanup
	let finalFoods = [];
	foods.forEach(({ingredients, allergens}) => {
		if (allergens.size === 1) possibleSafeIngredients.delete(ingredients.values().next().value);
		if (allergens.size === 0) {
			ingredients.forEach(ingredient => {
				possibleSafeIngredients.add(ingredient);
			});
		}
		else finalFoods.push({ingredients, allergens});
	});

	// console.log(finalFoods);
	// console.log({possibleSafeIngredients});

	let total = 0;
	possibleSafeIngredients.forEach(safeIngredient => {
		let ingredientSearch = new RegExp(safeIngredient, 'g');
		total += (data.match(ingredientSearch) || []).length;
	});

	console.log("P1:", total);

});

function allergensAllFound(foods) {
	let length = foods.length;
	for (let i = 0; i < length; i++) {
		if (
			foods[i].allergens.size > 1 ||
			(foods[i].allergens.size === 1 && foods[i].ingredients.size > 1)
		) return false;
	}
	return true;
}
