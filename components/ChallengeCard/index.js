import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";
import styles from "../../Styles";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
var frLocale = require("date-fns/locale/fr");
import ChallengeCardItem from "../ChallengeCardItem";
import ChallengeCardCategory from "../ChallengeCardCategory";
import AvatarList from "../AvatarList";

const fullW = Dimensions.get("window").width;
class ChallengeCard extends React.Component {
  render() {
    const { challenge } = this.props;
    console.log(this.props);
    if (challenge.ref === undefined) {
      return (
        <View style={styles.container}>
          <Text>y'a rien</Text>
        </View>
      );
    }
    const detailsLeftChallengeCard = {
      position: "absolute",
      left: 8,
      zIndex: 2
    };
    const detailsrightChallengeCard = {
      position: "absolute",
      right: 8,
      zIndex: 2
    };
    if (this.props.variant) {
      detailsLeftChallengeCard.bottom = 8;
      detailsrightChallengeCard.bottom = 8;
    } else {
      detailsLeftChallengeCard.top = 8;
      detailsrightChallengeCard.top = 8;
    }
    return (
      <View
        style={[
          styles.card,
          styles.bgBlack,
          stylesLocal.customCSS,
          { overflow: "hidden" }
        ]}
      >
        <Text style={[styles.textWhite, styles.h4, { zIndex: 2 }]}>
          {challenge.ref.name}
        </Text>
        <Text style={[styles.textWhite, styles.text, { zIndex: 2 }]}>
          {challenge.owner.account.username}
        </Text>
        <View style={detailsrightChallengeCard}>
          <ChallengeCardCategory type={challenge.ref.category.name} />
        </View>
        <View style={detailsLeftChallengeCard}>
          <ChallengeCardItem
            icon="calendar"
            text={format(challenge.date.beginDate, "dddd DD MMMM")}
          />
          <ChallengeCardItem icon="pin" text={challenge.adress.city} />
        </View>
        {!this.props.variant ? (
          <View style={[{ position: "absolute", bottom: 60, zIndex: 2 }]}>
            <AvatarList challengers={challenge.challengers} />
          </View>
        ) : null}

        <Image
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 250,
            width: fullW,
            zIndex: 0,
            opacity: 0.7
          }}
          source={{
            uri: challenge.media.images[0].url
          }}
        />
      </View>
    );
  }
}

const stylesLocal = StyleSheet.create({
  customCSS: { width: fullW }
});

export default ChallengeCard;
