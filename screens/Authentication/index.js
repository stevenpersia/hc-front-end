import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	Image,
	StatusBar
} from 'react-native';
import styles from '../../Styles';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import { AsyncStorage } from 'react-native';

class Authentication extends React.Component {
	state = {
		auth: {
			id: '',
			token: ''
		}
	};
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/bg/01.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<StatusBar hidden />
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.dispatch(DrawerActions.toggleDrawer())
					}
					style={{ paddingTop: 20, paddingLeft: 20, width: 50 }}
				>
					<Entypo name="list" size={30} color="black" />
				</TouchableOpacity>
				<View
					style={[
						styles.container,
						{ justifyContent: 'center' },
						customStyles.customCSS
					]}
					behavior="padding"
					enabled
				>
					<Image
						source={require('../../assets/images/logo-hc.png')}
						style={{ width: 180, height: 180 }}
					/>
					<Text
						style={[
							styles.h3,
							styles.paddingTop10,
							styles.textCenter,
							styles.textWhite
						]}
					>
						Human Challenge
					</Text>

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
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ChallengesList')}
					style={{
						position: 'absolute',
						bottom: 30,
						right: 25
					}}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={[styles.textWhite, customStyles.text16]}>Passer</Text>
						<Entypo name="chevron-small-right" size={25} color="#FFF" />
					</View>
				</TouchableOpacity>
			</ImageBackground>
		);
	}

	componentDidMount() {
		AsyncStorage.multiGet(['id', 'token'], (err, stores) => {
			const id = stores[0][1];
			const token = stores[1][1];

			this.setState(
				{
					auth: {
						id,
						token
					}
				},
				() => {
					if (this.state.auth.id && this.state.auth.token) {
						this.props.navigation.navigate('ChallengesList');
					}
				}
			);
		});
	}
}

const customStyles = StyleSheet.create({
	text16: {
		fontSize: 16
	}
});

export default Authentication;
