import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ImageBackground
} from 'react-native';
import styles from '../../Styles';

class Walkthrough extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/bg/05.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<View style={{ alignItems: 'center' }}>
					<Text>This is the Walkthrough screen</Text>
				</View>
			</ImageBackground>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default Walkthrough;
