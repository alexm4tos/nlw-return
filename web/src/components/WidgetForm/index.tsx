import { useState } from 'react';

import bugSvgUrl from '../../assets/bug.svg';
import ideaSvgUrl from '../../assets/idea.svg';
import thoughtSvgUrl from '../../assets/thought.svg';

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugSvgUrl,
			alt: 'Imagem de um inseto',
		},
		description:
			'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: ideaSvgUrl,
			alt: 'Imagem de uma lâmpada',
		},
		description:
			'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thoughtSvgUrl,
			alt: 'Imagem de uma nuvem de pensamento',
		},
		description: 'Queremos te ouvir. O que você gostaria de nos dizer? ',
	},
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	function handleFeedbackReset() {
		setFeedbackSent(false);
		setFeedbackType(null);
	}

	return (
		<div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
			{feedbackSent ? (
				<FeedbackSuccessStep onFeedbackReset={handleFeedbackReset} />
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep
							onFeedbackTypeChanged={setFeedbackType}
						/>
					) : (
						<FeedbackContentStep
							feedbackType={feedbackType}
							onFeedbackSent={() => setFeedbackSent(true)}
							onFeedbackReset={handleFeedbackReset}
						/>
					)}
				</>
			)}

			<footer className='text-xs text-neutral-400'>
				Feito com ♥ pela{' '}
				<a
					href='https://rocketseat.com.br'
					className='underline underline-offset-2'
				>
					Rocketseat
				</a>
			</footer>
		</div>
	);
}
