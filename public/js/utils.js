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
		<button class="export-set">Copy Link</button>
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
	compareSets: (savedForms, myTest) => {
		for (let form of savedForms) {
			if (form[0].name == myTest[0].name) {
				return true;
			}
		}
		return false;
	},
	getTestHTML: () => {
		return `<b id="test-name"> Name of test</b>
		<div id="stats">
			<p id="test-stats-score">100%</p>
			<p id="test-stats-current-question">1/10</p>
		</div>
		<b id="test-question"> question text here.</b>
		<br>
		<input type="text" placeholder="Enter definition" id="test-text">
		<button id="test-enter">Enter</button>`;
	},
	getEndTestHTML: () => {
		return `
		<b id="test-name"> Name of test</b>
		<p id="end-score">Your Score: </p>
		<button id="try-again">Try Again</button>
		`;
	},
};
export default Utils;
