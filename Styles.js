import {
	StyleSheet,
	Dimensions
} from 'react-native';

const primaryColor = '#1d262a';
const secondaryColor = '#CCC';

const animauxColor = '#7D1AFF';
const environnementColor = '#FFBE1A';
const socialColor = '#18DE22';
const cultureColor = '#DF4FFF';

const blackColor = '#1d262a';
const grayColor = '#DDD';
const whiteColor = '#FFF';
const redColor = '#b71c1c';

const fullW = Dimensions.get('window').width;
const fullH = Dimensions.get('window').height;

export default StyleSheet.create({
	/* GLOBAL */
	container: {
		flex: 1,
		alignItems: 'center'
		/* justifyContent: "center" */
	},
	/* CARD */
	card: {

		alignItems: 'center',
		justifyContent: 'center'
	},
	/* FLEX */
	flexRow: {
		flexDirection: 'row'
	},
	flexRowReverse: {
		flexDirection: 'row-reverse'
	},

	/* TEXT COLORS */
	textAnimauxColor: {
		color: animauxColor
	},
	textEnvironnementColor: {
		color: environnementColor
	},
	textSocialColor: {
		color: socialColor
	},
	textCultureColor: {
		color: cultureColor
	},
	textPrimaryColor: {
		color: primaryColor
	},
	textSecondaryColor: {
		color: secondaryColor
	},
	textBlack: {
		color: blackColor
	},
	textWhite: {
		color: whiteColor
	},
	textGray: {
		color: grayColor
	},
	textError: {
		color: redColor
	},

	/* BACKGROUND COLORS */
	bgAnimauxColor: {
		backgroundColor: animauxColor
	},
	bgEnvironnementColor: {
		backgroundColor: environnementColor
	},
	bgSocialColor: {
		backgroundColor: socialColor
	},
	bgCultureColor: {
		backgroundColor: cultureColor
	},
	bgPrimaryColor: {
		backgroundColor: primaryColor
	},
	bgSecondaryColor: {
		backgroundColor: secondaryColor
	},
	bgBlack: {
		backgroundColor: blackColor
	},
	bgWhite: {
		backgroundColor: whiteColor
	},
	bgGray: {
		backgroundColor: grayColor
	},

	/* MENU & LIST */
	menu: {},
	list: {},

	/* TEXT */
	h1: {
		fontSize: 55
	},
	h2: {
		fontSize: 45
	},
	h3: {
		fontSize: 35
	},
	h4: {
		fontSize: 25
	},
	h5: {
		fontSize: 20
	},
	text: {
		fontSize: 14
	},
	small: {
		fontSize: 11
	},
	textCenter: {
		textAlign: 'center'
	},
	textJustify: {
		textAlign: 'justify'
	},
	textLeft: {
		textAlign: 'left'
	},
	textRight: {
		textAlign: 'right'
	},
	bold: {
		fontWeight: 'bold'
	},
	uppercase: {
		textTransform: 'uppercase'
	},
	italic: {
		fontStyle: 'italic'
	},

	/* TEXT */
	h1: {
		fontSize: 55
	},
	h2: {
		fontSize: 45
	},
	h3: {
		fontSize: 35
	},
	h4: {
		fontSize: 25
	},
	h5: {
		fontSize: 20
	},
	text: {
		fontSize: 14
	},
	small: {
		fontSize: 11
	},
	textCenter: {
		textAlign: 'center'
	},
	textJustify: {
		textAlign: 'justify'
	},
	textLeft: {
		textAlign: 'left'
	},
	textRight: {
		textAlign: 'right'
	},
	bold: {
		fontWeight: 'bold'
	},
	uppercase: {
		textTransform: 'uppercase'
	},
	italic: {
		fontStyle: 'italic'
	},
	error: {
		color: 'red'
	},
	/* BUTTONS & LINKS */
	primaryButtonColor: {
		backgroundColor: primaryColor
	},
	secondaryButtonColor: {
		backgroundColor: secondaryColor
	},
	button: {
		backgroundColor: '#1d262a',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		width: Dimensions.get('window').width - 60
	},
	buttonSecondary: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: '#1d262a',
		width: Dimensions.get('window').width - 60
	},
	buttonSmall: {
		backgroundColor: grayColor,
		marginHorizontal: 4,
		paddingVertical: 0,
		paddingHorizontal: 0,
		borderRadius: 8,
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
		height: 30
	},

	/* SCREEN RESOLUTIONS */
	fullHeight: fullH,
	fullWidth: fullW,

	/* SCREEN RESOLUTIONS & DIMENSIONS */
	fullHeight: {
		height: fullH
	},
	fullWidth: {
		width: fullW
	},
	w100: {
		width: Dimensions.get('window').width - 60
	},
	/* BORDER RADIUS SISILAFAMILLE TOVO */
	rounded: {
		borderRadius: 5
	},
	roundedTop: {
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	},
	roundedLeft: {
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	roundedRight: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	roundedBottom: {
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	},

	/* PADDING 10 PX */
	padding10: {
		padding: 10
	},
	paddingV10: {
		paddingVertical: 10
	},
	paddingH10: {
		paddingHorizontal: 10
	},
	paddingTop10: {
		paddingTop: 10
	},
	paddingBottom10: {
		paddingBottom: 10
	},
	paddingLef10: {
		paddingLeft: 10
	},
	paddingRight10: {
		paddingRight: 10
	},

	/* PADDING 30 PX */
	padding30: {
		padding: 30
	},
	paddingV30: {
		paddingVertical: 30
	},
	paddingH30: {
		paddingHorizontal: 30
	},
	paddingTop30: {
		paddingTop: 30
	},
	paddingBottom30: {
		paddingBottom: 30
	},
	paddingLef30: {
		paddingLeft: 30
	},
	paddingRight30: {
		paddingRight: 30
	},

	/* MARGIN 10 PX */
	margin10: {
		margin: 10
	},
	marginV10: {
		marginVertical: 10
	},
	marginH10: {
		marginHorizontal: 10
	},
	marginTop10: {
		marginTop: 10
	},
	marginBottom10: {
		marginBottom: 10
	},
	marginLeft10: {
		marginLeft: 10
	},
	marginRight10: {
		marginRight: 10
	},

	/* MARGIN 30 PX */
	margin30: {
		margin: 30
	},
	marginV30: {
		marginVertical: 30
	},
	marginH30: {
		marginHorizontal: 30
	},
	marginTop30: {
		marginTop: 30
	},
	marginBottom30: {
		marginBottom: 30
	},
	marginLeft30: {
		marginLeft: 30
	},
	marginRight30: {
		marginRight: 30
	},

	/* MARGIN 30 PX */
	margin30: {
		margin: 30
	},
	marginV30: {
		marginVertical: 30
	},
	marginH30: {
		marginHorizontal: 30
	},
	marginTop30: {
		marginTop: 30
	},
	marginBottom30: {
		marginBottom: 30
	},
	marginLeft30: {
		marginLeft: 30
	},
	marginRight30: {
		marginRight: 30
	},

	/* FORM */
	input: {
		borderWidth: 1,
		borderColor: grayColor,
		borderRadius: 3,
		padding: 15,
		width: fullW - 60,
		margin: 10
	},

	/* ORGANISATEUR ANNE */

	/* BOX SHADOW NONOLAFAMILLE TOVO */
	android_WTF_Are_You_Doing: {}
});