import React from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  View
} from "react-native";
import styles from "../../../Styles";

// Inscription
class UserDetails extends React.Component {
  state = {
    errors: {
      username: false,
      phoneNumber: false,
      password: false
    }
  };
  next = e => {
    const { password, phoneNumber, username } = this.props;
    e.preventDefault();

    // Check all validations before to go to next step
    if (
      username &&
      username.length > 0 &&
      phoneNumber &&
      phoneNumber.length === 10 &&
      password &&
      password.length >= 8
    ) {
      this.props.nextStep();
    } else {
      const usernameValidation = username.length === 0 ? true : false;
      const phoneNumberValidation = phoneNumber.length < 10 ? true : false;
      const passwordValidation = password.length < 8 ? true : false;

      this.setState({
        errors: {
          username: usernameValidation,
          phoneNumber: phoneNumberValidation,
          password: passwordValidation
        }
      });
    }
  };

  render() {
    const { username, phoneNumber, password } = this.props;
    return (
      <ImageBackground
        source={require("../../../assets/images/bg/06.jpg")}
        style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: "cover" }]}
      >
        <KeyboardAvoidingView
          style={[styles.container, { justifyContent: "center" }]}
          behavior="padding"
          enabled
        >
          <Text style={[styles.h4, styles.paddingV30, styles.textBlack]}>
            Inscription
          </Text>
          <TextInput
            style={customStyles.input}
            placeholder="Pseudo"
            placeholderTextColor="#1d262a"
            onChangeText={value => {
              this.props.handleChange("username", value);
            }}
            value={username}
          />
          <Text>
            {this.state.errors.username === true ? "Pseudo requis" : ""}
          </Text>
          <TextInput
            style={customStyles.input}
            placeholder="Téléphone"
            placeholderTextColor="#1d262a"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={value => {
              this.props.handleChange("phoneNumber", value);
            }}
            value={phoneNumber}
          />
          <Text>
            {this.state.errors.phoneNumber === true
              ? "Numéro valide requis"
              : ""}
          </Text>
          <TextInput
            style={customStyles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#1d262a"
            secureTextEntry={true}
            onChangeText={value => {
              this.props.handleChange("password", value);
            }}
            value={password}
          />
          <Text>
            {this.state.errors.password === true
              ? "Mot de passe d'au moins 8 caractères requis"
              : ""}
          </Text>
          <TouchableOpacity
            onPress={this.next}
            style={[customStyles.button, styles.marginV10, styles.w100]}
          >
            <Text style={[styles.textCenter, styles.textWhite]}>Suivant</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const customStyles = StyleSheet.create({
  input: {
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 15,
    width: Dimensions.get("window").width - 60,
    margin: 5
  },
  button: {
    backgroundColor: "#1d262a",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 3,
    margin: 10,
    width: Dimensions.get("window").width - 60
  },
  buttonSecondary: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 3,
    margin: 10,
    borderWidth: 1,
    borderColor: "#1d262a",
    width: Dimensions.get("window").width - 60
  }
});

export default UserDetails;
