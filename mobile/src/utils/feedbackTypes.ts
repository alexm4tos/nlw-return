export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: require('../assets/bug.png'),
		description:
			'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
	},
	IDEA: {
		title: 'Ideia',
		image: require('../assets/idea.png'),
		description:
			'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
	},
	OTHER: {
		title: 'Outro',
		image: require('../assets/thought.png'),
		description: 'Queremos te ouvir. O que você gostaria de nos dizer? ',
	},
};
