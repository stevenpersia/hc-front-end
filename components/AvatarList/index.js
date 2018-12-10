import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";

class AvatarList extends React.Component {
  test = [
    {
      _id: "5c06987fc6e471212ce8b71e",
      account: {
        username: "Test3",
        email: "email3@email.com",
        phoneNumber: "012345678543",
        interests: [],
        avatar: []
      },
      challenges: {
        player: [
          { _id: "5c069954c6e471212ce8b722" },
          { _id: "5c069a60c6e471212ce8b724" },
          { _id: "5c054f7fc0477e00c8719d91" }
        ],
        manager: [{ _id: "5c069d53ab67eb3af025ab12" }]
      },
      badges: [],
      security: {
        token:
          "2GPFJsn8Ik0RhQejXO5h6zhYtf5TaNGg69qX53pbR5lxdqDDKBDA2VFWKx0OgoAv",
        hash: "/wXD9vign5nxSWYOcWDQc6bIGgviB1wiiX17Snerdfw=",
        salt:
          "RwYAPkX9vUIQJ5FaMlFqxGgkVbxpKiFnEWwWIxPsduHirWEYbbsi971376NTrCQW",
        pepper: "Private Joke",
        smsCode: "codeSMS"
      },
      __v: 8
    },
    {
      _id: "5c07f37f1a005a0016db8018",
      account: {
        username: "Gégé",
        email: "Gegelemotard@aol.com",
        phoneNumber: "0666888999",
        avatar: [
          {
            url:
              "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/1934785_1212686605200_223898_n.jpg?_nc_cat=104&_nc_ht=scontent-cdt1-1.xx&oh=ac3a411944e7774127fc30809a647033&oe=5CA1B94B"
          }
        ]
      },
      challenges: { player: [], manager: [] },
      badges: [],
      security: {
        token:
          "hAh9ozFkwyH3iMa6bAaODRKuKff6GuWZGY9n8pFhjwgpGjNbO0rG7puqOOeGoDSD",
        hash: "mkJCXD19irOzIfVM6/LaCuMZA0lsod5x6b8+EKZxxds=",
        salt:
          "z2w1a1bQpQ3Tnqp8ur5CAZ1HQ86SjeeDdnG10WaVYbmCV81aBxKB2VdVG1akESUT",
        pepper: "Private Joke",
        smsCode: "1234"
      },
      __v: 0
    },
    {
      _id: "5c06987fc6e471212ce8b71e",
      account: {
        username: "Test3",
        email: "email3@email.com",
        phoneNumber: "012345678543",
        interests: [],
        avatar: []
      },
      challenges: {
        player: [
          { _id: "5c069954c6e471212ce8b722" },
          { _id: "5c069a60c6e471212ce8b724" },
          { _id: "5c054f7fc0477e00c8719d91" }
        ],
        manager: [{ _id: "5c069d53ab67eb3af025ab12" }]
      },
      badges: [],
      security: {
        token:
          "2GPFJsn8Ik0RhQejXO5h6zhYtf5TaNGg69qX53pbR5lxdqDDKBDA2VFWKx0OgoAv",
        hash: "/wXD9vign5nxSWYOcWDQc6bIGgviB1wiiX17Snerdfw=",
        salt:
          "RwYAPkX9vUIQJ5FaMlFqxGgkVbxpKiFnEWwWIxPsduHirWEYbbsi971376NTrCQW",
        pepper: "Private Joke",
        smsCode: "codeSMS"
      },
      __v: 8
    },
    {
      _id: "5c07f37f1a005a0016db8018",
      account: {
        username: "Gégé",
        email: "Gegelemotard@aol.com",
        phoneNumber: "0666888999",
        avatar: [
          {
            url:
              "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/1934785_1212686605200_223898_n.jpg?_nc_cat=104&_nc_ht=scontent-cdt1-1.xx&oh=ac3a411944e7774127fc30809a647033&oe=5CA1B94B"
          }
        ]
      },
      challenges: { player: [], manager: [] },
      badges: [],
      security: {
        token:
          "hAh9ozFkwyH3iMa6bAaODRKuKff6GuWZGY9n8pFhjwgpGjNbO0rG7puqOOeGoDSD",
        hash: "mkJCXD19irOzIfVM6/LaCuMZA0lsod5x6b8+EKZxxds=",
        salt:
          "z2w1a1bQpQ3Tnqp8ur5CAZ1HQ86SjeeDdnG10WaVYbmCV81aBxKB2VdVG1akESUT",
        pepper: "Private Joke",
        smsCode: "1234"
      },
      __v: 0
    }
  ];

  renderAvatars(team) {
    const result = [];
    const maxNum = 5;
    const shift = 15;
    const itemWidth = 40;
    let numberItems = maxNum;
    if (team.length < maxNum) {
      numberItems = team.length;
    }

    for (let i = 0; i < maxNum && i < team.length; i++) {
      result.push(
        <LittleAvatar
          key={i}
          name={team[i].account.username}
          photo={team[i].account.avatar[0]}
          variant={this.props.variant || false}
        />
      );
    }
    return result;
  }

  render() {
    let testStyle = {
      marginLeft: this.props.variant ? 0 : -25
    };
    if (this.props.variant) {
      testStyle.width = "80%";
      testStyle.justifyContent = "space-between";
      testStyle.justifyContent = "space-around";
    }
    return (
      <View style={[styles.flexRowReverse, testStyle]}>
        {/* {this.renderAvatars(this.props.challengers)} */}
        {this.renderAvatars(this.test)}
      </View>
    );
  }
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default AvatarList;
