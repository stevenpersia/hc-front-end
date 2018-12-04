import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Menu extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Menu component</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Menu;
