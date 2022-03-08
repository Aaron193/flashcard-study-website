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

class User {
	constructor() {
		this.selectors = {
			currentPage: document.getElementsByClassName('card-container')[0],
			card: {
				// why do i have this twice?
				cardContainer: document.getElementsByClassName('card-container')[0],
				cardTitle: document.getElementsByClassName('card-title')[0],
			},

			navButtons: {
				createGame: document.getElementById('create-game'),
				joinGame: document.getElementById('join-game'),
				createSet: document.getElementById('create-set'),
				loadSet: document.getElementById('load-set'),
				settings: document.getElementById('settings'),
			},
			form: {
				studySetForm: document.getElementsByClassName('study-set-form')[0],
				addTermButton: document.getElementById('form-button-add-item'),
				formItemWrapper: document.getElementById('form-item-wrapper'),
				formItem: document.getElementsByClassName('form-item'),
				formInput: document.getElementsByClassName('form-item-input'),
				formFinish: document.getElementById('form-finish'),
				deleteTerm: document.getElementsByClassName('form-delete-term'),
				formItemLabel: document.getElementsByClassName('form-item-label'),
			},
		};
		// static test
		// this.currentSet = [
		// 	{ term: 'term 1', def: 'definition 1' },
		// 	{ term: 'Title Card 2', def: 'This is a long definition explaining how the number 2 card is long and im writing gibberish idk what im sayuing lollll! 2' },
		// 	{ term: 'term 3', def: 'Long text here lol hahahaha Mintea pro lol 3' },
		// 	{ term: 'Who was the first president? (card#4)', def: 'abraham washington?' },
		// ];
		this.currentSet = [];
		this.currentCard = {
			term: null,
			def: null,
			index: 0,
			onFront: true, // the card is on the term, false=card is on definition
		};
		this.init();
	}
	init() {
		/* Create listeners for nav bar */
		for (let ele in this.selectors.navButtons) this.selectors.navButtons[ele].onclick = () => this.clickedNavButton(ele);

		this.selectors.card.cardContainer.onclick = () => this.clickedCard();
		this.selectors.form.addTermButton.onclick = () => this.addTermToForm();
		this.selectors.form.formFinish.onclick = () => this.submitForm();

		// good that onclick function will not overlap if called multiple times
		for (let i = 0; i < this.selectors.form.deleteTerm.length; i++) this.selectors.form.deleteTerm[i].onclick = () => this.deleteFormNode(this.selectors.form.deleteTerm[i]);
	}
	clickedNavButton(ele) {
		switch (ele) {
			case 'createGame':
				this.createGame();
				break;
			case 'joinGame':
				this.joinGame();
				break;
			case 'createSet':
				this.createSet();
				break;
			case 'loadSet':
				this.loadSet();
				break;
			case 'settings':
				this.settings();
				break;
		}
	}
	createSet() {
		console.log('clicked');
		//
	}
	joinGame() {
		console.log('clicked');

		//
	}
	createSet() {
		console.log('clicked');
		this.selectors.currentPage.style.display = 'none';
		this.selectors.form.studySetForm.style.display = 'block';

		//
	}
	loadSet() {
		console.log('clicked');

		//
	}
	settings() {
		console.log('clicked');

		//
	}
	flipCard() {
		this.selectors.card.cardTitle.innerText = this.currentCard.def;
		this.currentCard.onFront = false;
	}
	clickedCard() {
		if (this.currentCard.onFront) {
			this.flipCard();
			return;
		}
		let card = this.currentSet[this.currentCard.index++];
		if (!card) {
			this.lastCard();
			return;
		}
		this.currentCard.term = card.term;
		this.currentCard.def = card.def;
		this.updateCard();
	}
	updateCard() {
		this.selectors.card.cardTitle.innerText = this.currentCard.term;
		this.currentCard.onFront = true;
	}
	lastCard() {
		console.log('last card');
	}

	updateFormDeleteListener() {
		for (let i = 0; i < this.selectors.form.deleteTerm.length; i++) {
			this.selectors.form.deleteTerm[i].onclick = () => {
				this.deleteFormNode(this.selectors.form.deleteTerm[i]);
			};
		}
	}
	/* User inside form and wants to add a row */
	addTermToForm() {
		let formLength = this.selectors.form.formItem.length + 1;
		let rowToAdd = Utils.addTermToForm(formLength);
		this.selectors.form.formItemWrapper.append(rowToAdd);

		/* update listeners for x button */
		this.updateFormDeleteListener();

		/* Scroll to bottom of view */
		this.selectors.form.studySetForm.scrollTo(0, this.selectors.form.studySetForm.scrollHeight);
	}
	submitForm() {
		for (let i = 0; i < this.selectors.form.formInput.length; i++) {
			if (this.selectors.form.formInput[i].value.length == 0) {
				alert('Please fill all previous cards before submitting!');
				return;
			}
		}
		this.newCards();
		// localStorage.setItem("SET", )
	}
	newCards() {
		let set = [];
		let offset = 0;

		let slots = 2; // each two textbox's is for one card -- also i should set this number somewhere else
		let numberOfCards = this.selectors.form.formInput.length / slots;

		for (let i = 0; i < numberOfCards; i++) {
			set.push({
				term: this.selectors.form.formInput[offset++].value,
				def: this.selectors.form.formInput[offset++].value,
			});
		}
		this.currentSet = set;
		this.currentCard.index = 1; // needs to be 1 or else u need to click twice for the first card to change
		this.currentCard.term = this.currentSet[0].term;
		this.currentCard.def = this.currentSet[0].def;

		this.updateCard();

		this.selectors.form.studySetForm.style.display = 'none';
		this.selectors.currentPage.style.display = 'block';
	}
	deleteFormNode(term) {
		term.parentNode.remove();

		// i need to update card numbers now
		for (let i = 0; i < this.selectors.form.formItemLabel.length; i++) {
			this.selectors.form.formItemLabel[i].innerText = `Card ${i + 1}`;
		}
		// !! always update listener after mutating the cards !!
		this.updateFormDeleteListener();
	}
}

let user = new User();
