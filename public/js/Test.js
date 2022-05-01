import Utils from './utils.js';
import user from './index.js';
class Test {
	constructor(title, questions, again = false) {
		this.name = title;
		this.questions = questions;
		if (!again) {
			this.questions.splice(0, 1);
		}
		this.index = 0;
		// show term first
		this.testMode = 'term';

		this.totalCorrect = 0;
		this.totalTries = 0;

		this.score = null;

		this.KEYS = {
			ENTER: 13,
		};

		window.onkeypress = e => {
			switch (e.which) {
				case this.KEYS.ENTER:
					try {
						this.runValidation();
					} catch {}
					break;
			}
		};

		this.selectors = {
			testPage: document.getElementById('test-page'),
			testName: document.getElementById('test-name'),
			testQuestion: document.getElementById('test-question'),
			testInput: document.getElementById('test-text'),
			testEnter: document.getElementById('test-enter'),
			testScoreCorner: document.getElementById('test-stats-score'),
			testQuestionNumber: document.getElementById('test-stats-current-question'),
		};
		this.selectors.testEnter.onclick = () => this.runValidation();
		this.setTest();
	}
	updateSelectors() {
		this.selectors = {
			testPage: document.getElementById('test-page'),
			testName: document.getElementById('test-name'),
			testQuestion: document.getElementById('test-question'),
			testInput: document.getElementById('test-text'),
			testEnter: document.getElementById('test-enter'),
			testScoreCorner: document.getElementById('test-stats-score'),
			testQuestionNumber: document.getElementById('test-stats-current-question'),
		};
		// update button listener
		this.selectors.testEnter.onclick = () => this.runValidation();
	}
	init() {
		// set title for test
		this.selectors.testName.textContent = this.name;
		this.showQuestion(this.index);
		// set display status for test question number
		this.setQuestionNumber();
	}
	clearTest() {
		let container = this.selectors.testPage;
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}
	setTest(hardClear = false) {
		// reset test
		this.clearTest();
		this.selectors.testPage.innerHTML = Utils.getTestHTML();
		// needs this cuz old selectors no longer work
		this.updateSelectors();
		if (!hardClear) this.init();
	}
	setQuestionNumber() {
		this.selectors.testQuestionNumber.textContent = `${this.index + 1}/${this.questions.length}`;
	}
	showQuestion(index) {
		this.selectors.testQuestion.textContent = this.questions[index][this.testMode];
	}

	runValidation() {
		// trim = remove spacing from beginning / end of string
		let userValue = this.selectors.testInput.value.toLowerCase().trim();
		let getOppositeMode = this.testMode === 'term' ? 'def' : 'term';
		let answer = this.questions[this.index][getOppositeMode].toLowerCase().trim();

		this.totalTries++;

		if (answer == userValue) this.correct();
		else this.wrong();
	}
	nextQuestion() {
		this.index++;
		if (this.index >= this.questions.length) {
			this.endTest();
			return;
		}
		this.setQuestionNumber();
		this.showQuestion(this.index);
	}
	correct() {
		this.selectors.testInput.value = '';
		this.totalCorrect++;
		this.updateScore();
		this.nextQuestion();
	}
	wrong() {
		console.log('wrong!');
		this.updateScore();
	}
	updateScore() {
		let score = Number(((this.totalCorrect / this.totalTries) * 100).toFixed(2));
		this.selectors.testScoreCorner.textContent = `${score}%`;
		this.score = score;
	}
	endTest() {
		console.log('test is over');
		this.clearTest();
		this.selectors.testPage.innerHTML = Utils.getEndTestHTML();
		document.getElementById('end-score').textContent = `Your Score: ${this.score}%`;
		console.log(this.name);
		document.getElementById('test-name').textContent = this.name;

		document.getElementById('try-again').onclick = () => {
			this.setTest(true);
			user.tryAgain();
		};
	}
}
export default Test;
