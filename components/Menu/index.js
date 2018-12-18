import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {
	Entypo,
	MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';

class Menu extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					source={require('../../assets/images/logo-menu.png')}
					style={{ width: 170, height: 80, marginVertical: 30 }}
				/>
				<TouchableOpacity
					onPress={() => this.props.navigate('ChallengesMap')}
					style={customStyles.li}
				>
					<MaterialCommunityIcons
						name="map-marker-radius"
						size={18}
						color="#1d262a"
					/>
					<Text style={customStyles.litext}>Voir les défis</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigate('CreateChallenge')}
					style={customStyles.li}
				>
					<Entypo name="circle-with-plus" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Créer un défi</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigate('Profile')}
					style={customStyles.li}
				>
					<MaterialIcons name="account-circle" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Mon profil</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigate('Settings')}
					style={customStyles.li}
				>
					<MaterialIcons name="settings" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Mes réglages</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigate('Example')}
					style={customStyles.li}
				>
					<Entypo name="list" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Toutes les pages</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const customStyles = StyleSheet.create({
	li: {
		borderBottomWidth: 1,
		borderBottomColor: '#F2F2F2',
		paddingVertical: 20,
		width: '100%',
		paddingLeft: 70,
		flexDirection: 'row',
		alignItems: 'center'
	},
	litext: {
		fontSize: 20,
		paddingLeft: 10,
		color: '#1d262a'
	}
});

export default Menu;
