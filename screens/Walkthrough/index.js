import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../Styles';

class Walkthrough extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Walkthrough screen</Text>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default Walkthrough;
