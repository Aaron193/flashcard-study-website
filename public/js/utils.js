const Utils = {
	addTermToForm: cardNumber => {
		if (typeof cardNumber != 'number') {
			alert('something went wrong! error code: 01');
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
};

export default Utils;
