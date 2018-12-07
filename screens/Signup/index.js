import React from 'react';
import axios from 'axios';
import UserDetails from './containers/UserDetails';
import ConfirmPhoneNumber from './containers/ConfirmPhoneNumber';
import SmsActivation from './containers/SmsActivation';
import LastStep from './containers/LastStep';

class Signup extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		step: 3,
		username: '',
		phoneNumber: '',
		password: '',
		smsCodeUser: '',
		email: '',
		avatar: '',
		interests: []
	};

	// Generate SMS code
	smsCodeNumber = max => {
		return Math.floor(Math.random() * Math.floor(max));
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

	// Add avatar image to state
	handleAvatar = value => {
		this.setState({
			avatar: 'data:image/jpg;base64,' + value
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

	// Final register button with conditions
	register = () => {
		const { avatar, username, phoneNumber, password, email } = this.state;
		console.log(username, phoneNumber, password, email, avatar);

		axios
			.post('https://human-challenge-back-end.herokuapp.com/api/signup/', {
				account: {
					username: username,
					phoneNumber: phoneNumber,
					password: password,
					email: email
				},
				security: {
					smsCode: ''
				},
				challenges: {
					player: [],
					manager: []
				},
				files: [avatar]
			})
			.then(response => {
				this.props.navigation.navigate('ChallengesMap');
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		switch (this.state.step) {
			case 1:
				return (
					<UserDetails
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						{...this.state}
					/>
				);
			case 2:
				return (
					<ConfirmPhoneNumber
						prevStep={this.prevStep}
						nextStep={this.nextStep}
						handleSmsCodeSend={this.handleSmsCodeSend}
						{...this.state}
					/>
				);

			case 3:
				return (
					<SmsActivation
						prevStep={this.prevStep}
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						{...this.state}
					/>
				);
			case 4:
				return (
					<LastStep
						handleChange={this.handleChange}
						handleAvatar={this.handleAvatar}
						register={this.register}
						{...this.state}
					/>
				);
		}
	}
}

export default Signup;
