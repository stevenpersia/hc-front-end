import React from 'react';
import axios from 'axios';
import PhoneNumber from './containers/PhoneNumber';
import ChangePassword from './containers/ChangePassword';
import LastStep from './containers/LastStep';
import { DrawerActions } from 'react-navigation-drawer';

class ForgotPassword extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		step: 1,
		phoneNumber: '',
		smsCodeUser: '',
		newPassword: '',
		error: false
	};

	// Verification SMS code
	handleSmsCodeSend = () => {
		axios
			.post('https://api.authy.com/protected/json/phones/verification/start', {
				api_key: '9bhtmpYqL2r7zcn4HRHiSIm3fGOVGHoP',
				via: 'sms',
				phone_number: this.state.phoneNumber,
				country_code: 33
			})
			.then(response => {
				console.log('SMS sended', response);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	// Previous buttons
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	};

	// Next buttons
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	// Return to login page
	goToLoginPage = () => {
		this.props.navigation.navigate('Login');
	};

	// Open Menu
	openMenu = () => {
		this.props.navigation.dispatch(DrawerActions.toggleDrawer());
	};

	render() {
		switch (this.state.step) {
			case 1:
				return (
					<PhoneNumber
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						handleSmsCodeSend={this.handleSmsCodeSend}
						goToLoginPage={this.goToLoginPage}
						openMenu={this.openMenu}
						{...this.state}
					/>
				);
			case 2:
				return (
					<ChangePassword
						prevStep={this.prevStep}
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						changePassword={this.changePassword}
						openMenu={this.openMenu}
						{...this.state}
					/>
				);
			case 3:
				return (
					<LastStep
						goToLoginPage={this.goToLoginPage}
						openMenu={this.openMenu}
					/>
				);
		}
	}
}

export default ForgotPassword;
