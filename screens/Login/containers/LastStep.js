import React from 'react';
import {
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	ImageBackground,
	View,
	Dimensions,
	StyleSheet
} from 'react-native';
import styles from '../../../Styles';

class LastStep extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/02.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					<Text style={[styles.h4, styles.textBlack]}>Changement réussi !</Text>
					<Text
						style={[
							styles.text,
							styles.padding30,
							styles.textCenter,
							styles.textBlack
						]}
					>
						Vous pouvez dorénavant vous connecter avec notre nouveau mot de
						passe.
					</Text>
					<TouchableOpacity
						onPress={() => this.props.goToLoginPage()}
						style={[
							customStyles.button,
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
			</ImageBackground>
		);
	}
}

const customStyles = StyleSheet.create({
	input: {
		backgroundColor: '#FFF',
		borderRadius: 3,
		padding: 15,
		width: Dimensions.get('window').width - 60,
		margin: 10
	},
	button: {
		backgroundColor: '#1d262a',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		width: Dimensions.get('window').width - 60
	},
	buttonSecondary: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: '#1d262a',
		width: Dimensions.get('window').width - 60
	}
});

export default LastStep;
