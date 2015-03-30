function search() {
	// set our target div/list
	var target	= document.getElementById('recipe-finder');
	var ulObj	= document.createElement('ul');
	target.appendChild(ulObj);
	// fetch the CSV
	fetchCSV(function(contents) {
		var fridgeItems = contents.split("\r\n");
		recipeFound = false;
		// cycle recipes
		for (var a in recipes) {
			var allIngredientsMatch = true;
			// cycle ingredients
			for (var b in recipes[a].ingredients) {
				// cycle fridge
				for (var c in fridgeItems) {					
					var itemProps = fridgeItems[c].split(",");
					if (itemProps.length) {
						var itemDate  = itemProps[3];
							itemDate  = itemDate.split("/");
						
						itemDate	  = new Date(parseInt(itemDate[2]),(parseInt(itemDate[1])-1),parseInt(itemDate[0]));
						var dateNow	  = new Date();
						if (
							(recipes[a].ingredients[b].item		!=	itemProps[0]) ||
							(recipes[a].ingredients[b].amount 	>	itemProps[1]) ||
							(recipes[a].ingredients[b].unit 	!=	itemProps[2]) ||
							(dateItem							<	dateNow)
						){
							allIngredientsMatch = false;
						}
					}
				}
				// if all ingredients match, we can use this item.
				if (allIngredientsMatch) {
					var liObj = document.createElement('li');
					liObj.innerHTML = recipes[a].name
					ulObj.appendChild(liObj);
					
					recipeFound = true;
					break;
				}
			}
		}
		if (!recipeFound) {
			var errorDiv = document.createElement('div');
			errorDiv.innerHTML = "No recipe found, order takeout";
			target.appendChild(errorDiv);
		}
	});
}
function fetchCSV(fn) {
	var myRequest = new XMLHttpRequest();
	myRequest.onreadystatechange = function() {
		if ((myRequest.readyState = 4) && (myRequest.responseText.length > 1)) {
			fn(myRequest.responseText);
		}
	}
	myRequest.open("GET", "http://newscorp.logisofttech.com.au/fridge.csv", false);
	myRequest.setRequestHeader('Content-Type', 'text/html');
	myRequest.send();
}