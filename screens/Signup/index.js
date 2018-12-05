import React from 'react';
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

	handleChange = name => {
		this.setState({ name });
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

	render() {
		const {
			step,
			username,
			phoneNumber,
			password,
			smsCode,
			email,
			avatar,
			interests
		} = this.state;

		const values = {
			username,
			phoneNumber,
			password,
			smsCode,
			email,
			avatar,
			interests
		};

		switch (step) {
			case 1:
				return (
					<UserDetails
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
			case 2:
				return (
					<SmsActivation
						prevStep={this.prevStep}
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
			case 3:
				return (
					<LastStep
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
		}
	}
}

export default Signup;
