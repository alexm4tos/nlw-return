import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { ArrowLeft } from 'phosphor-react-native';
import * as FileSystem from 'expo-file-system';

import { Button } from '../Button';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { api } from '../../services/api';

import { styles } from './styles';
import { theme } from '../../theme';

interface Props {
	feedbackType: FeedbackType;
	onFeedbackSent: () => void;
	onFeedbackReset: () => void;
}

export function Form({ feedbackType, onFeedbackSent, onFeedbackReset }: Props) {
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [comment, setComment] = useState('');
	const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

	const feedbackTypeInfo = feedbackTypes[feedbackType];

	function handleScreenshot() {
		captureScreen({
			format: 'png',
		})
			.then((uri) => setScreenshot(uri))
			.catch((error) => console.log(error));
	}

	function handleScreenshotRemove() {
		setScreenshot(null);
	}

	async function handleSubmitFeedback() {
		if (isSubmittingFeedback) return;

		setIsSubmittingFeedback(true);

		const encodedBase64 =
			screenshot &&
			(await FileSystem.readAsStringAsync(screenshot, {
				encoding: 'base64',
			}));

		const screenshotBase64 =
			encodedBase64 && `data:image/png;base64,${encodedBase64}`;

		try {
			await api.post('/feedbacks', {
				type: feedbackType,
				screenshot: screenshotBase64,
				comment,
			});

			onFeedbackSent();
		} catch (error) {}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onFeedbackReset}>
					<ArrowLeft
						size={24}
						weight="bold"
						color={theme.colors.text_secondary}
					/>
				</TouchableOpacity>

				<View style={styles.titleContainer}>
					<Image source={feedbackTypeInfo.image} style={styles.image} />

					<Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
				</View>
			</View>

			<TextInput
				multiline
				autoFocus
				autoCorrect={false}
				style={styles.input}
				onChangeText={setComment}
				selectionColor={theme.colors.brand}
				placeholder={feedbackTypeInfo.description}
				placeholderTextColor={theme.colors.text_secondary}
			/>

			<View style={styles.footer}>
				<ScreenshotButton
					screenshot={screenshot}
					onTakeShot={handleScreenshot}
					onRemoveShot={handleScreenshotRemove}
				/>

				<Button
					onPress={handleSubmitFeedback}
					isLoading={isSubmittingFeedback}
					canClick={!!comment}
				/>
			</View>
		</View>
	);
}
