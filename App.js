import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { Text, View, DrawerItems } from 'react-native';
import Menu from './components/Menu';

import ExampleScreen from './Example';
import WalkthroughScreen from './screens/Walkthrough';
import ChallengesListScreen from './screens/Challenges/ChallengesList';
import ChallengesMapScreen from './screens/Challenges/ChallengesMap';
import ChallengeScreen from './screens/Challenges/Challenge';
import CreateChallengeScreen from './screens/Challenges/CreateChallenge';
import UpdateChallengeScreen from './screens/Challenges/UpdateChallenge';
import AuthenticationScreen from './screens/Authentication';
import SignupScreen from './screens/Signup';
import LoginScreen from './screens/Login/Login';
import ForgotPasswordScreen from './screens/Login/ForgotPassword';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import AboutScreen from './screens/About';

const AppNavigator = createDrawerNavigator(
	{
		Authentication: {
			screen: AuthenticationScreen,
			navigationOptions: {
				title: 'Inscription / Connexion'
			}
		},
		ChallengesMap: {
			screen: ChallengesMapScreen,
			navigationOptions: {
				title: 'Map Défis'
			}
		},
		ChallengesList: {
			screen: ChallengesListScreen,
			navigationOptions: {
				title: 'Liste Défis'
			}
		},
		Challenge: {
			screen: ChallengeScreen,
			navigationOptions: {
				title: 'Page défi'
			}
		},
		CreateChallenge: {
			screen: CreateChallengeScreen,
			navigationOptions: {
				title: 'Créer son défi'
			}
		},
		UpdateChallenge: {
			screen: UpdateChallengeScreen,
			navigationOptions: {
				title: 'Modifier son défi'
			}
		},
		Signup: {
			screen: SignupScreen,
			navigationOptions: {
				title: 'Inscription'
			}
		},
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				title: 'Connexion'
			}
		},
		ForgotPassword: {
			screen: ForgotPasswordScreen,
			navigationOptions: {
				title: 'Mot de passe oublié ?'
			}
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				title: 'Mon profil'
			}
		},
		Settings: {
			screen: SettingsScreen,
			navigationOptions: {
				title: 'Mes réglages'
			}
		}
	},
	{
		contentComponent: props => <Menu navigate={props.navigation.navigate} />
	}
);

export default createAppContainer(AppNavigator);
