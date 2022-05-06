import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';

import { FeedbackType, feedbackTypes } from '..';

import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';
import { Loading } from '../../Loading';

import { api } from '../../../services/api';

interface FeedbackTypeStepProps {
	feedbackType: FeedbackType;
	onFeedbackSent: () => void;
	onFeedbackReset: () => void;
}

export function FeedbackContentStep({
	feedbackType,
	onFeedbackSent,
	onFeedbackReset,
}: FeedbackTypeStepProps) {
	const feedbackTypeInfo = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [feedback, setFeedback] = useState('');
	const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

	async function handleSubmitFeedback(event: FormEvent) {
		event.preventDefault();

		setIsSubmittingFeedback(true);

		try {
			await api.post('/feedbacks', {
				type: feedbackType,
				comment: feedback,
				screenshot,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmittingFeedback(false);
		}

		onFeedbackSent();
	}

	return (
		<>
			<header>
				<button
					type='button'
					onClick={onFeedbackReset}
					className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'
				>
					<ArrowLeft className='w-4 h-4' weight='bold' />
				</button>

				<span className='text-xl leading-6 flex items-center gap-2'>
					<img
						src={feedbackTypeInfo.image.source}
						alt={feedbackTypeInfo.image.alt}
						className='w-6 h-6'
					/>
					{feedbackTypeInfo.title}
				</span>

				<CloseButton />
			</header>

			<form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
				<textarea
					placeholder={feedbackTypeInfo.description}
					onChange={(event) => setFeedback(event.target.value)}
					className='min-w-[296px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent'
				/>

				<footer className='flex gap-2 mt-2'>
					<ScreenshotButton
						screenshot={screenshot}
						onScreenshotTook={setScreenshot}
					/>

					<button
						type='submit'
						disabled={feedback.length === 0 || isSubmittingFeedback}
						className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
					>
						{isSubmittingFeedback ? <Loading /> : 'Enviar feedback'}
					</button>
				</footer>
			</form>
		</>
	);
}
