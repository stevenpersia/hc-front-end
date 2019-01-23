import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../Styles';
import {
	Entypo,
	MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

class Menu extends React.Component {
	state = {
		auth: {
			id: '',
			token: ''
		}
	};

	render() {
		const { id, token } = this.state.auth;
		return (
			<View style={styles.container}>
				<Image
					source={require('../../assets/images/logo-menu.png')}
					style={{ width: 170, height: 80, marginVertical: 30 }}
				/>
				<TouchableOpacity
					onPress={() => this.props.navigate('ChallengesList')}
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
					onPress={() =>
						this.props.navigate(
							id && token ? 'CreateChallenge' : 'Authentication'
						)
					}
					style={customStyles.li}
				>
					<Entypo name="circle-with-plus" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Créer un défi</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						this.props.navigate(id && token ? 'Profile' : 'Authentication')
					}
					style={customStyles.li}
				>
					<MaterialIcons name="account-circle" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Mon profil</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						this.props.navigate(id && token ? 'Settings' : 'Authentication')
					}
					style={customStyles.li}
				>
					<MaterialIcons name="settings" size={18} color="#1d262a" />
					<Text style={customStyles.litext}>Mes réglages</Text>
				</TouchableOpacity>
			</View>
		);
	}

	componentDidMount() {
		AsyncStorage.multiGet(['id', 'token'], (err, stores) => {
			const id = stores[0][1];
			const token = stores[1][1];

			this.setState({
				auth: {
					id,
					token
				}
			});
		});
	}
}

const customStyles = StyleSheet.create({
	li: {
		borderBottomWidth: 1,
		borderBottomColor: '#F2F2F2',
		paddingVertical: 20,
		width: '100%',
		paddingLeft: 50,
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
