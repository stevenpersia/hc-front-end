import { createStackNavigator, createAppContainer } from 'react-navigation';

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

const AppNavigator = createStackNavigator({
	Example: {
		screen: ExampleScreen,
		navigationOptions: {
			title: 'Example Styles'
		}
	},
	Walkthrough: {
		screen: WalkthroughScreen,
		navigationOptions: {
			title: 'Walkthrough'
		}
	},
	ChallengesList: {
		screen: ChallengesListScreen,
		navigationOptions: {
			title: 'Liste Défis'
		}
	},
	ChallengesMap: {
		screen: ChallengesMapScreen,
		navigationOptions: {
			title: 'Map Défis'
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
	Authentication: {
		screen: AuthenticationScreen,
		navigationOptions: {
			title: 'Inscription / Connexion'
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
	},
	About: {
		screen: AboutScreen,
		navigationOptions: {
			title: 'A propos'
		}
	}
});

export default createAppContainer(AppNavigator);
