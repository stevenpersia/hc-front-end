import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../Styles';

class About extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the About screen</Text>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default About;
