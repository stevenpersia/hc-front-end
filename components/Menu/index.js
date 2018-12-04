import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../Styles';

class Menu extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Menu component</Text>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default Menu;
