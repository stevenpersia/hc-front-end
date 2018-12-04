import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import styles from './Styles';

class Example extends React.Component {
	render() {
		return (
			<ScrollView style={customStyles.content}>
				<View style={[styles.marginBottom10]}>
					<Text style={styles.h4}>Titre et texte</Text>
				</View>

				<View>
					<Text style={styles.h1}>Titre 1</Text>
					<Text style={styles.h2}>Titre 2</Text>
					<Text style={styles.h3}>Titre 3</Text>
					<Text style={styles.h4}>Titre 4</Text>
					<Text style={styles.h5}>Titre 5</Text>
					<Text style={styles.text}>Paragraphe</Text>
					<Text style={styles.small}>small</Text>
					<Text style={styles.italic}>italic</Text>
					<Text style={styles.bold}>bold</Text>
					<Text style={styles.uppercase}>uppercase</Text>
				</View>

				<View style={[styles.marginV10]}>
					<Text style={styles.h4}>Couleurs</Text>
				</View>

				<View>
					<View style={[styles.bgPrimaryColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>
							Couleur primaire
						</Text>
					</View>
					<View style={[styles.bgSecondaryColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>
							Couleur secondaire
						</Text>
					</View>
					<View style={[styles.bgAnimauxColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>Animaux</Text>
					</View>
					<View style={[styles.bgEnvironnementColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>Environnement</Text>
					</View>
					<View style={[styles.bgSocialColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>Social</Text>
					</View>
					<View style={[styles.bgCultureColor, styles.padding10]}>
						<Text style={[styles.bold, styles.textWhite]}>Culture</Text>
					</View>
				</View>

				<View style={[styles.marginV10]}>
					<Text style={styles.h4}>Boutons</Text>
				</View>

				<TouchableOpacity
					style={[styles.button, styles.margin10, styles.bgEnvironnementColor]}
				>
					<Text
						style={[
							styles.textCenter,
							styles.uppercase,
							styles.bold,
							styles.textWhite
						]}
					>
						Button
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.margin10, styles.bgAnimauxColor]}
				>
					<Text style={[styles.textCenter, styles.uppercase, styles.bold]}>
						Button
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.button, styles.margin10]}>
					<Text style={[styles.textCenter, styles.uppercase, styles.bold]}>
						Button
					</Text>
				</TouchableOpacity>

				<View style={[styles.marginV10]}>
					<Text style={styles.h4}>Autres</Text>
				</View>

				<View style={[styles.bgGray, styles.rounded, styles.padding30]}>
					<Text style={[styles.textBlack, styles.textJustify]}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Text>
				</View>
			</ScrollView>
		);
	}
}

const customStyles = StyleSheet.create({
	content: { flex: 1, margin: 30 }
});

export default Example;
