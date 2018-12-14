import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import styles from "../../Styles";
import ChallengeCard from "../../components/ChallengeCard";
import AvatarList from "../../components/AvatarList";
import IconList from "../../components/IconList";
import { Tooltip } from "react-native-elements";
import ChallengesMap from "../Challenges/ChallengesMap";

const userTest = "5c069853c6e471212ce8b71c";

class Challenge extends React.Component {
  // ... donner une valeur par défaut aux clés de response.data
  state = {
    step: 1,
    isLoading: true
    //  ref.category.name
  };

  componentDidMount() {
    axios
      .get(
        "https://human-challenge-back-end.herokuapp.com/api/challenge/5c07ab4fa5d7c100890b9877"
      )
      .then(response => {
        /* console.log("responsedata", response.data); */
        this.setState(
          {
            ...response.data,
            isLoading: false
          },
          () => {
            /* console.log("challenge", this.state); */
          }
        );
      });
  }
  // basculer la position du challenge en récupérant le UseriD//
  // envoyer le token
  toggleChallenge(userId) {
    axios.put(
      "https://human-challenge-back-end.herokuapp.com/api/user/participate/5c07ab4fa5d7c100890b9877",
      { "security.token": req.headers.authorization.replace("Bearer ", "") }
    );
    console.log(userId);
  }
  //Si l'id du UserTest est dans le tableau challenge on retourne le bouton défi
  //Si l'iD du UserTest n'est pas dans le tableau challenge on retourne le bouton
  renderButton() {
    const challengers = this.state.challengers;
    const buttonText = "Rejoindre le défi";
    if (challengers.indexOf(userTest) > -1) {
      buttonText = "Quitter le défi";
    }
    return (
      <TouchableOpacity onPress={() => this.toggleChallenge(userTest)}>
        <Text style={styles.button}>{buttonText}</Text>
      </TouchableOpacity>
    );
    /* console.log("challengers", challengers); */
  }

  /* renderButton = () => {
    // if(user === player(participant) &&  New Date > EndDate ) {render }alors défi est terminé
    // if(user === manager(créateur de défi) && New Date > EndDate) alors défi est terminé
    // if(user === player && New Date < EndDate ) alors il peut annuler son défi
    // if(user === manager && New Date < EndDate ) alors il peut annuler son défi
    // if(user !== player & user !== manager )  alors user doit s inscrire sur la page Signup

    const dateNow = new Date();
    if (player === true && dateNow > EndDate) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Le Défi est terminé</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (player === true && dateNow < EndDate) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Participer au défi</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (manager === true && dateNow > EndDate) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Le Défi est terminé</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (manager === true && dateNow < EndDate) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Participer au défi</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (user !== player && user !== manager) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Le Défi est terminé</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }; */
  // Challenge CardCategory c'est l'enfant de la page Challenge : la props est défini ici a la ligne 27 //
  // on a importer le style, et on va chercher dedans ce dont on besoin //
  render() {
    // console.log("this.state.owner.organizer", this.state.owner.organizer);
    if (this.state.isLoading === true) {
      return <Text>En cours de chargement ... </Text>;
    }
    // console.log("Sofiane", this.state);
    return (
      <ScrollView>
        <View style={[styles.h4, styles.bold, styles.textBlack]}>
          <ChallengeCard
            id="5c07ab4fa5d7c100890b9877"
            challenge={this.state}
            variant
          />
          <View style={customStyles.squareGeneral}>
            <Text style={[styles.h4, styles.bold, styles.textBlack]}>
              Description
            </Text>
            <View style={[customStyles.squareComponent]}>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#e5f7e1",
                  justifyContent: "center"
                }}
              >
                {this.state.ref.description}
              </Text>
            </View>
          </View>
          <View style={customStyles.squareGeneral}>
            <Text style={[styles.h4, styles.bold, styles.textBlack]}>
              Actions
            </Text>
            <View style={[customStyles.squareComponent]}>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#e5f7e1",
                  justifyContent: "center"
                }}
              >
                {this.state.ref.action}
              </Text>
            </View>
          </View>
          <View style={customStyles.squareGeneral}>
            <Text
              style={[
                styles.h4,
                styles.bold,
                styles.textBlack,
                { justifyContent: "center" }
              ]}
            >
              Prerequis
            </Text>
            <View style={[customStyles.squareComponent]}>
              <IconList Prerequisites={this.state.ref.prerequisites} />
            </View>
          </View>
        </View>
        <View style={customStyles.squareGeneral}>
          <Text style={[styles.h4, styles.bold, styles.textBlack]}>
            Organisateur
          </Text>
          <View style={customStyles.firstSquare}>
            <View style={customStyles.firstElement}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: this.state.owner.account.avatar[0].url }}
              />
            </View>
            <View style={customStyles.secondElement}>
              <Text>{this.state.owner.organizer}</Text>
              <Text>
                {this.state.owner.challenges.manager.length} défis crées
              </Text>
            </View>
          </View>
          <View style={customStyles.secondSquare}>
            <View style={customStyles.thirdElement}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: this.state.owner.account.avatar[0].url }}
              />
            </View>
            <View style={customStyles.fourthElement}>
              <Text>{this.state.owner.account.username}</Text>
              <Text>{this.state.owner.account.email}</Text>
              <Text>{this.state.owner.account.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={customStyles.squareGeneral}>
          <Text style={[styles.h4, styles.bold, styles.textBlack]}>
            Participants
          </Text>
          <View style={[customStyles.squareComponent]}>
            <AvatarList challengers={this.state.challengers} variant />
          </View>
        </View>
        <View style={customStyles.squareGeneral}>
          <Text style={[styles.h4, styles.bold, styles.textBlack, {}]}>
            Mots-Clés
          </Text>
        </View>
        <ChallengesMap loc={this.state.loc} id={this.state._id} />
        <View>
          {this.renderButton()}
          {/* <TouchableOpacity onPress={() => {}} style={[styles.button]}>
            
            <Text style={[styles.textCenter, styles.textWhite]}>
              Participer à un défi
            </Text>
            </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }
}

const customStyles = StyleSheet.create({
  squareGeneral: {
    display: "flex",
    height: 250,
    alignItems: "center",
    backgroundColor: "#e5f7e1",
    flexDirection: "column",
    borderBottomWidth: 1
  },
  squareComponent: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  },
  firstSquare: {
    flexDirection: "row",
    width: 250,
    backgroundColor: "#88fc5a",
    marginTop: "8%",
    marginBottom: "3%"
  },
  firstElement: {
    alignItems: "center",
    marginTop: "4%",
    marginBottom: "5%",
    marginLeft: "5%"
  },
  secondElement: {
    alignItems: "center",
    marginLeft: "20%",
    marginTop: "4%"
  },
  secondSquare: {
    alignItems: "center",
    width: 250,
    flexDirection: "row",
    backgroundColor: "#88fc5a",
    marginTop: "1%",
    marginBottom: "10%"
  },
  thirdElement: {
    alignItems: "center",
    marginTop: "1%",
    marginBottom: "5%",
    marginLeft: "5%"
  },
  fourthElement: {
    alignItems: "center",
    marginLeft: "20%",
    marginTop: "1%",
    marginBottom: "5%"
  }
});

export default Challenge;
