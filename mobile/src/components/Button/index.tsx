import React from 'react';
import {
	Text,
	ActivityIndicator,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
	isLoading: boolean;
	canClick?: boolean;
}

export function Button({ isLoading, canClick = true, ...rest }: Props) {
	return (
		<TouchableOpacity
			style={[styles.container, !canClick && styles.disabled]}
			disabled={!canClick}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator color={theme.colors.text_on_brand_color} />
			) : (
				<Text style={styles.title}>Enviar feedback</Text>
			)}
		</TouchableOpacity>
	);
}
