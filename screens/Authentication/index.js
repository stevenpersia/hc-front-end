import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import styles from '../../Styles';

class Authentication extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/bg/01.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<View
					style={[
						styles.container,
						{ justifyContent: 'center' },
						customStyles.customCSS
					]}
					behavior="padding"
					enabled
				>
					<Text
						style={[
							customStyles.text16,
							styles.paddingV30,
							styles.w100,
							styles.textCenter,
							styles.textWhite
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
						<Text style={[styles.textCenter, styles.textWhite]}>
							S'inscrire
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Login')}
						style={[
							styles.button,
							styles.secondaryButtonColor,
							styles.marginV10,
							styles.bgWhite,
							styles.w100
						]}
					>
						<Text style={[styles.textCenter]}>Se connecter</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		);
	}
}

const customStyles = StyleSheet.create({
	text16: {
		fontSize: 16
	}
});

export default Authentication;
