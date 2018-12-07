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

import ChallengeCard from "../../components/ChallengeCard";
import AvatarList from "../../components/AvatarList";
import IconList from "../../components/IconList";

class Challenge extends React.Component {
  state = {
    isLoading: true,
    ref: {}
    //  ref.category.name
  };

  componentDidMount() {
    axios
      .get(
        "https://human-challenge-back-end.herokuapp.com/api/challenge/5c07ab4fa5d7c100890b9877"
      )
      .then(response => {
        console.log("responsedata", response.data);
        this.setState(
          {
            ...response.data,
            isLoading: false
          },
          () => {
            console.log("challenge", this.state);
          }
        );
      });
  }
  // Challenge CardCategory c'est l'enfant de la page Challenge : la props est défini ici a la ligne 27//
  //on a importer style, et on va chercher dedans ce dont on besoin//
  render() {
    if (this.state.isLoading === true) {
      return <Text>En cours de chargement ... </Text>;
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ChallengeCard
          id="5c07ab4fa5d7c100890b9877"
          challenge={this.state}
          variant
        />
        <Text style={[styles.h4, styles.bold, styles.textBlack]}>
          Description
        </Text>
        <Text>{this.state.ref.description}</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </Text>
        <Text style={[styles.h4, styles.bold, styles.textBlack]}>Actions</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </Text>
        <Text style={[styles.h4, styles.bold, styles.textBlack]}>
          Prerequis
        </Text>
        <IconList Prerequisites={this.state.ref.prerequisites} />

        <Text style={[styles.h4, styles.bold, styles.textBlack]}>
          Organisateur
        </Text>
        <Text style={[styles.h4, styles.bold, styles.textBlack]}>
          Participants
        </Text>
        <AvatarList challengers={this.state.challengers} variant />
        <Text style={[styles.h4, styles.bold, styles.textBlack]}>
          Mots-Clés
        </Text>
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
