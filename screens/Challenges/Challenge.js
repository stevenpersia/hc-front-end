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
import { format } from "date-fns";
import { Tooltip } from "react-native-elements";
import ChallengesMap from "../Challenges/ChallengesMap";
import { AsyncStorage } from "react-native";

class Challenge extends React.Component {
  // ... donner une valeur par défaut aux clés de response.data
  state = {
    step: 1,
    isLoading: true,
    userParticipated: false,
    auth: {
      id: " ",
      token: " "
    },
    finished: false,
    users: {
      challenges: {
        player: " ",
        manager: " "
      }
    }
  };

  /* 49 : ---------------id du defi------------- */
  /* 54 :  date de fin est supérieur a la date d'aujourd'hui */
  /* 61 :le defi est terminé */
  /* 66 : sinon on traverse le tableau de challengers  */
  /* 69 : on renvoie le nombre de challengers identifiés   */
  /* 68 :dans ce cas le user participe   */
  componentDidMount() {
    AsyncStorage.multiGet(["id", "token"], (err, stores) => {
      const id = stores[0][1];
      const token = stores[1][1];

      this.setState(
        {
          auth: {
            id,
            token
          }
        },
        () => {
          axios
            .get(
              "https://human-challenge-back-end.herokuapp.com/api/challenge/5c07ab4fa5d7c100890b9877"
            )
            .then(response => {
              if (
                format(response.data.date.endDate, "x") <
                format(new Date(), "x")
              ) {
                this.setState({
                  finished: true
                });
              } else {
                for (let i = 0; i < response.data.challengers.length; i++) {
                  if (response.data.challengers[i]._id === this.state.auth.id) {
                    this.setState({
                      userParticipated: true
                    });
                  }
                }
              }

              this.setState({
                ...response.data,
                isLoading: false
              });
            });
        }
      );
    });
  }

  handleParticipate = () => {
    axios
      .put(
        "https://human-challenge-back-end.herokuapp.com/api/user/participate/5c07ab4fa5d7c100890b9877",
        {},
        {
          headers: {
            Authorization: this.state.auth.token
          }
        }
      )
      .then(response => {
        this.setState({
          userParticipated: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCancel = () => {
    axios
      .delete(
        "https://human-challenge-back-end.herokuapp.com/api/user/remove/5c07ab4fa5d7c100890b9877",
        {
          headers: {
            Authorization: this.state.auth.token
          }
        }
      )
      .then(response => {
        this.setState({
          userParticipated: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Si l'id du UserTest est dans le tableau challenge on retourne le bouton défi
  // Si l'iD du UserTest n'est pas dans le tableau challenge on retourne le bouton
  // On utilise utilise un état fini sans la possibilité de cliquer sur un bouton sinon on participe au defi qd user à participer sinon on annule sa participation//
  renderButton() {
    if (this.state.finished === true) {
      return (
        <TouchableOpacity disabled>
          <Text>Terminé</Text>
        </TouchableOpacity>
      );
    }

    if (this.state.userParticipated === false) {
      return (
        <TouchableOpacity onPress={() => this.handleParticipate()}>
          <Text>Participer au défi</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.handleCancel()}>
          <Text>Annuler sa participation</Text>
        </TouchableOpacity>
      );
    }
  }

  renderTag = () => {
    axios
      .get(
        "https://human-challenge-back-end.herokuapp.com/api/user/5c07ab4fa5d7c100890b9877"
      )

      .then(response => {
        if (userParticipated === false) {
          response.data.ref.tags[0];
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // on a importer le style, et on va chercher dedans ce dont on besoin //
  render() {
    // console.log("this.state.owner.organizer", this.state.owner.organizer);
    if (this.state.isLoading === true) {
      return <Text>En cours de chargement ... </Text>;
    }

    return (
      <ScrollView>
        <View style={[styles.h4, styles.bold, styles.textBlack]}>
          <ChallengeCard
            id={this.state}
            challenge={
              this.state
            } /* Challenge CardCategory c'est l'enfant de la page Challenge : la props est défini ici a la ligne 27 */
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
              <Text>{this.state.ref.contactName}</Text>
              <Text>{this.state.ref.contactEmail}</Text>
              <Text>{this.state.ref.contactPhone}</Text>
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
          <View>
            <TouchableOpacity disabled>
              {<Text>{this.state.ref.tags[0]}</Text>}
            </TouchableOpacity>
            <TouchableOpacity disabled>
              {<Text>{this.state.ref.tags[1]}</Text>}
            </TouchableOpacity>
            <TouchableOpacity disabled>
              {<Text>{this.state.ref.tags[2]}</Text>}
            </TouchableOpacity>
            <TouchableOpacity disabled>
              {<Text>{this.state.ref.tags[3]}</Text>}
            </TouchableOpacity>
          </View>
        </View>
        <ChallengesMap loc={this.state.loc} id={this.state._id} />
        <View>{this.renderButton()}</View>
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
