import React from 'react';
import axios from 'axios';
import UserDetails from './containers/UserDetails';
import SmsActivation from './containers/SmsActivation';
import LastStep from './containers/LastStep';

class Signup extends React.Component {
	state = {
		step: 1,
		username: '',
		phoneNumber: '',
		password: '',
		smsCode: '',
		email: '',
		avatar: '',
		interests: []
	};

	handleChange = (key, value) => {
		this.setState({ [key]: value }, () => console.log(this.state));
	};

	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	};

	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	register = () => {
		const { username, phoneNumber, password, smsCode, email } = this.state;
		if (username && phoneNumber && password && smsCode) {
			axios
				.post('https://human-challenge-back-end.herokuapp.com/api/signup', {
					account: {
						username: username,
						phoneNumber: phoneNumber,
						password: password,
						email: email
					},
					security: {
						smsCode: smsCode
					},
					challenges: {
						player: [],
						manager: []
					}
				})
				.then(response => {
					this.props.navigation.navigate('ChallengesMap');
				})
				.catch(err => {
					console.log(err);
				});
		}
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
					<SmsActivation
						prevStep={this.prevStep}
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						{...this.state}
					/>
				);
			case 3:
				return (
					<LastStep
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						register={this.register}
						{...this.state}
					/>
				);
		}
	}
}

export default Signup;
