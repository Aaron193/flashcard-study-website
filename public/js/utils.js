const Utils = {
	addTermToForm: cardNumber => {
		if (typeof cardNumber != 'number') {
			alert('something went wrong! [01]');
			return;
		}

		let newCard = document.createElement('div');
		newCard.className = 'form-item';
		/* !! make sure this is safe !! */
		newCard.innerHTML = `<label class="form-item-label">Card ${cardNumber}</label><br>
		<input class="form-item-input" maxlength="110" type="text" placeholder="Enter term.." />
		<input class="form-item-input" maxlength="110" type="text" placeholder="Enter definition.." />
		<button class="form-delete-term">delete</button><br />`;

		return newCard;
	},
	addSavedSets: name => {
		if (typeof name != 'string') {
			alert('something went wrong! [02]');
			return;
		}
		let newItem = document.createElement('div');
		newItem.className = 'set-item';
		newItem.innerHTML = `
		<h4 class="set-name">${name}</h4>
		<button class="set-load">Load Set</button>
		<button class="set-remove">Remove Set</button>
		<button class="set-test">Test</button>
		<hr>`;
		return newItem;
	},
	findSetNameIndex: (arr, toFind) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][0].name == toFind) {
				return i;
			}
		}
	},
};

export default Utils;
