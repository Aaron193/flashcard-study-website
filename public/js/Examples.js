class ExampleSet {
	constructor() {
		this.count = 0;
	}
	newSet() {
		this.count++;
		switch (this.count) {
			case 1:
				return this.setOne();
				break;
			case 2:
				return this.setTwo();
				break;
		}
	}
	setOne() {
		return [
			[
				{
					name: 'French Verbs',
				},
				{
					term: 'avoir',
					def: 'to have',
				},
				{
					term: 'aller',
					def: 'to go',
				},
				{
					term: 'faire',
					def: 'to do',
				},
				{
					term: 'donner',
					def: 'to give',
				},
				{
					term: 'trouver',
					def: 'to find',
				},
				{
					term: 'finir',
					def: 'to finish',
				},
				{
					term: 'ouvrir',
					def: 'to open',
				},
				{
					term: 'arriver',
					def: 'to arrive',
				},
				{
					term: 'appeler',
					def: 'to call',
				},
				{
					term: 'voir',
					def: 'to see',
				},
				{
					term: 'partir',
					def: 'to leave',
				},
				{
					term: 'comprendre',
					def: 'to understand',
				},
				{
					term: 'prendre',
					def: 'to take',
				},
				{
					term: 'manger',
					def: 'to eat',
				},
				{
					term: 'savoir',
					def: 'to know',
				},
				{
					term: 'parler',
					def: 'to speak',
				},
				{
					term: 'mettre',
					def: 'to put',
				},
				{
					term: 'servir',
					def: 'to serve',
				},
				{
					term: 'agir',
					def: 'to act',
				},
				{
					term: 'jouer',
					def: 'to play',
				},
			],
		];
	}
	setTwo() {
		/* ref: 
         - National Human Genome Research Institutehttps://www.genome.gov
         - https://s3.amazonaws.com/scschoolfiles/631/12-2-2016_cells_vocabulary_list___definitions.pdf
         - https://biologydictionary.net/cell-parts-and-functions/
        */
		return [
			[
				{
					name: 'Cells Vocabulary',
				},
				{
					term: "Known as the 'powerhouse' of the cell",
					def: 'Mitochondria',
				},
				{
					term: 'The gelatinous liquid that fills the inside of a cell',
					def: 'Cytoplasm',
				},
				{
					term: 'It packages proteins into membrane-bound vesicles',
					def: 'Golgi Body',
				},
				{
					term: 'Small organelles composed of RNA-rich cytoplasmic granules that are sites of protein synthesis.',
					def: 'Ribosome',
				},
				{
					term: "Known as the 'brain' of the cell.",
					def: 'Nucleus',
				},
				{
					term: 'A thick, rigid membrane that surrounds a plant cell. ',
					def: 'Cell Wall',
				},
				{
					term: 'An elongated or disc-shaped organelle containing chlorophyll.',
					def: 'Chloroplast',
				},
				{
					term: 'The membrane that surrounds the nucleus.',
					def: 'Nuclear membrane',
				},
				{
					term: 'Their key function is to break down and recycle unwanted material for the cell',
					def: 'Lysosomes',
				},
				{
					term: 'can occupy up to 90% of the interior space of plant cells.',
					def: 'Vacuole',
				},
			],
		];
	}
}
export default ExampleSet;
