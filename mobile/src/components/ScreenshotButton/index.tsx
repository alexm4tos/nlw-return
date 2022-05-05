import React from 'react';
import { Camera, Trash } from 'phosphor-react-native';
import { View, TouchableOpacity, Image } from 'react-native';

import { theme } from '../../theme';
import { styles } from './styles';

interface Props {
	screenshot: string | null;
	onTakeShot: () => void;
	onRemoveShot: () => void;
}

export function ScreenshotButton({
	screenshot,
	onTakeShot,
	onRemoveShot,
}: Props) {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={screenshot ? onRemoveShot : onTakeShot}
		>
			{screenshot ? (
				<View>
					<Image source={{ uri: screenshot }} style={styles.image} />

					<Trash
						size={22}
						weight="fill"
						style={styles.removeIcon}
						color={theme.colors.text_secondary}
					/>
				</View>
			) : (
				<Camera size={24} color={theme.colors.text_primary} weight="bold" />
			)}
		</TouchableOpacity>
	);
}
