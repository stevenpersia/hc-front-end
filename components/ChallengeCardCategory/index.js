import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from '../../Styles';
import { Entypo } from '@expo/vector-icons';
import { white } from 'ansi-colors';

class ChallengeCardCategory extends React.Component {
	renderIcon() {
		if (this.props.type === 'Environnement') {
			return 'tree';
		}
		if (this.props.type === 'Social') {
			return 'hand';
		}
		if (this.props.type === 'Animaux') {
			return 'feather';
		}
		if (this.props.type === 'Culture') {
			return 'palette';
		}
		return 'emoji-sad';
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: this.props.marker ? '#FFF' : '',
					width: this.props.marker ? 48 : 'auto',
					height: this.props.marker ? 48 : 'auto',
					borderRadius: this.props.marker ? 24 : 0,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Entypo
					name={this.renderIcon()}
					size={this.props.sizeFont ? Number(this.props.sizeFont) : 26}
					color={this.props.color ? this.props.color : 'white'}
					style={{
						padding: this.props.marker ? 5 : 0
					}}
				/>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default ChallengeCardCategory;
