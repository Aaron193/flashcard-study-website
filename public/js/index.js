import Utils from './utils.js';
class User {
	constructor() {
		this.selectors = {
			currentPage: document.getElementsByClassName('card-container')[0],
			card: {
				cardContainer: document.getElementsByClassName('card-container')[0],
				cardTitle: document.getElementsByClassName('card-title')[0],
				cardNumber: document.getElementById('card-number'),
			},

			navButtons: {
				homeButton: document.getElementById('home-button'),
				createSet: document.getElementById('create-set'),
				loadSet: document.getElementById('load-set'),
				createParty: document.getElementById('create-party'),
				joinParty: document.getElementById('join-party'),
				settings: document.getElementById('settings'),
			},
			form: {
				studySetForm: document.getElementsByClassName('study-set-form')[0],
				addTermButton: document.getElementById('form-button-add-item'),
				formItemWrapper: document.getElementById('form-item-wrapper'),
				formName: document.getElementById('form-name'),
				formItem: document.getElementsByClassName('form-item'),
				formInput: document.getElementsByClassName('form-item-input'),
				formFinish: document.getElementById('form-finish'),
				deleteTerm: document.getElementsByClassName('form-delete-term'),
				formItemLabel: document.getElementsByClassName('form-item-label'),
			},
			load: {
				main: document.getElementById('load-tests'),
				savedSetsContainer: document.getElementById('saved-sets-container'),
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
			case 'homeButton':
				this.homeButton();
				break;
			case 'createParty':
				this.createParty();
				break;
			case 'joinParty':
				this.joinParty();
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
	homeButton() {
		console.log('homeButton');

		this.switchPage(this.selectors.currentPage, this.selectors.card.cardContainer);
		// go to main screen
	}
	createParty() {
		//
		console.log('createParty');
	}
	joinParty() {
		console.log('joinParty');

		//
	}
	createSet() {
		console.log('createSet');

		this.switchPage(this.selectors.currentPage, this.selectors.form.studySetForm);

		//
	}
	loadSet() {
		console.log('loadSet');
		this.switchPage(this.selectors.currentPage, this.selectors.load.main);

		// clear saved items
		let children = this.selectors.load.savedSetsContainer.children;
		while (children.length >= 1) children[0].remove();

		// load items from localStorage
		let mySets = JSON.parse(localStorage.getItem('saved-forms'));

		if (mySets != null) {
			mySets.forEach(set => {
				let setToAdd = Utils.addSavedSets(set[0].name);
				this.selectors.load.savedSetsContainer.append(setToAdd);
			});
		}
	}
	settings() {
		console.log('settings');

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
		// return to beginning of set
		this.currentCard.index = 1;
		this.currentCard.def = this.currentSet[1].def;
		this.currentCard.term = this.currentSet[1].term;

		this.updateCard();
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
		// TOOD: make sure form names cant be repeated
		if (this.selectors.form.formName.length == 0) {
			alert('Please enter a set-name!');
			return;
		}

		for (let i = 0; i < this.selectors.form.formInput.length; i++) {
			if (this.selectors.form.formInput[i].value.length == 0) {
				alert('Please fill all previous cards before submitting!');
				return;
			}
		}

		this.newCards();
		this.saveSet();
	}
	saveSet() {
		/*  Structure -
				  test 1,                                          test 2
savedforms = [   [testName,{term:null,def:null},{etc..},{etc..}], [testName,{term:null,def:null},{etc..},{etc..}]   ]
		*/

		let previousForms = localStorage.getItem('saved-forms');
		/* User has no saved sets in local storage */
		if (!previousForms) {
			console.log('You have no previous forms');

			// init empty array (should refactor)
			localStorage.setItem('saved-forms', JSON.stringify([]));

			// access arr just made
			let sf = JSON.parse(localStorage.getItem('saved-forms'));

			sf.push(this.currentSet);

			// save
			localStorage.setItem('saved-forms', JSON.stringify(sf));
			return;
		}

		// get previous forms
		let pf = JSON.parse(previousForms);

		pf.push(this.currentSet);

		// save
		localStorage.setItem('saved-forms', JSON.stringify(pf));
	}
	newCards() {
		let set = [];
		let offset = 0;

		let slots = 2; // each two textbox's is for one card -- also i should set this number somewhere else
		let numberOfCards = this.selectors.form.formInput.length / slots;

		set.push({ name: this.selectors.form.formName.value });
		for (let i = 0; i < numberOfCards; i++) {
			set.push({
				term: this.selectors.form.formInput[offset++].value,
				def: this.selectors.form.formInput[offset++].value,
			});
		}
		this.currentSet = set; // BUG SOMEWHERE: still repeats first card
		this.currentCard.index = 2; // needs to be 2 or else it repeats first card

		// index 1 here cuz index 0 is the set name
		this.currentCard.term = this.currentSet[1].term;
		this.currentCard.def = this.currentSet[1].def;

		this.updateCard();

		this.switchPage(this.selectors.form.studySetForm, this.selectors.card.cardContainer);
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

	switchPage(curPage, newPage) {
		curPage.style.display = 'none';
		newPage.style.display = 'block';
		this.selectors.currentPage = newPage;
	}
}

let user = new User();
