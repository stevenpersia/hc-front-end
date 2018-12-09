import React from 'react';
import { Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../../../Styles';

class LastStep extends React.Component {
	render() {
		return (
			<KeyboardAvoidingView
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text style={styles.h4}>Changement réussi !</Text>
				<Text style={[styles.text, styles.padding30, styles.textCenter]}>
					Vous pouvez dorénavant vous connecter avec notre nouveau mot de passe.
				</Text>
				<TouchableOpacity
					onPress={() => this.props.goToLoginPage()}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Se connecter
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

export default LastStep;
