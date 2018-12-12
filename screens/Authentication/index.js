import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from '../../Styles';

class Authentication extends React.Component {
	render() {
		return (
			<View
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text
					style={[
						styles.text,
						styles.paddingV10,
						styles.w100,
						styles.textCenter
					]}
				>
					Pour participer ou créer un défi, il faut être membre de la
					communauté.
				</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Signup')}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>S'inscrire</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Login')}
					style={[
						styles.button,
						styles.secondaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Se connecter
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default Authentication;
