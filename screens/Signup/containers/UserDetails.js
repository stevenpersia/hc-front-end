import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../../Styles';

class UserDetails extends React.Component {
	saveAndContinue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const { values } = this.props;
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<TextInput
					style={styles.input}
					placeholder="Pseudo"
					onChangeText={() => {
						this.props.handleChange('username');
					}}
					value={values.username}
					autoFocus={true}
				/>
				<TextInput
					style={styles.input}
					placeholder="Téléphone"
					keyboardType="numeric"
					maxLength={10}
					value={values.phoneNumber}
				/>
				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					secureTextEntry={true}
					value={values.password}
				/>
				<TouchableOpacity
					onPress={this.saveAndContinue}
					style={[styles.button, styles.primaryButtonColor, styles.marginV10]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Suivant</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default UserDetails;
