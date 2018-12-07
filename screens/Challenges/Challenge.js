import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  FlatList
} from "react-native";
import axios from "axios";
import styles from "../../Styles";

import ChallengeCardRegister from "../../components/ChallengeCardRegister";
import ChallengeCard from "../../components/ChallengeCard";

class Challenge extends React.Component {
  state = {
    //  ref.category.name
  };
  componentDidMount() {
    axios
      .get(
        "https://human-challenge-back-end.herokuapp.com/api/challenge/5c07ab4fa5d7c100890b9877"
      )
      .then(response => {
        this.setState(response.data, () => {
          console.log(this.state);
        });
      });
  }

  // Challenge CardCategory c'est l'enfant de la page Challenge : la props est défini ici a la ligne 27//
  //on a importer style, et on va chercher dedans ce dont on besoin//
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ChallengeCard
          id="5c07ab4fa5d7c100890b9877"
          challenge={this.state}
          variant
        />
        <Text style={styles.textAnimauxColor}>Description</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </Text>
        <Text style={styles.textAnimauxColor}>Actions</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </Text>
        <Text style={styles.textAnimauxColor}>Prerequis</Text>

        <Text style={styles.textAnimauxColor}>Organisateur</Text>
        <Text style={styles.textAnimauxColor}>Participants</Text>
        <Text style={styles.textAnimauxColor}>Mots-Clés</Text>
      </ScrollView>
    );
  }
}

const customStyles = StyleSheet.create({
  customCSS: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 30
  }
});

export default Challenge;
