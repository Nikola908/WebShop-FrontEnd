import { createTheme } from '@mui/material/styles';

const FONT_WEIGHT_EXTRABOLD = 800
const FONT_WEIGHT_BOLD = 700
const FONT_WEIGHT_LIGHT = 400

const typography = {
	fontSize: 16,
	h1: {
		fontSize: '4.687rem',
		fontWeight: FONT_WEIGHT_EXTRABOLD,
		letterSpacing: '0rem',
	},
	h2: {
		fontSize: '4.0625rem',
		fontWeight: FONT_WEIGHT_EXTRABOLD,
		letterSpacing: '0rem',
	},
	h3: {
		fontSize: '3rem',
		fontWeight: FONT_WEIGHT_EXTRABOLD,
		letterSpacing: '0rem',
	},
	h4: {
		fontSize: '1.875rem',
		fontWeight: 400,
		letterSpacing: '0rem',
	},
	h5: {
		fontSize: '1.4rem',
		fontWeight: 500,
		letterSpacing: '0rem',
	},
	h6: {
		fontSize: '1rem',
		fontWeight: 400,
		letterSpacing: '0rem',
	},
	body1: {
		fontSize: '0.920rem',
		fontWeight: 400,
		letterSpacing: '0rem',
	},
	body2: {
		fontSize: '0.875rem',
		fontWeight: FONT_WEIGHT_BOLD,
		letterSpacing: '0rem',
	},
	button: {
		fontSize: '0.875rem',
		fontWeight: FONT_WEIGHT_BOLD,
		letterSpacing: '0rem',
	},
	overline: {
		fontSize: '1rem',
		fontWeight: FONT_WEIGHT_EXTRABOLD,
		letterSpacing: '0rem',

	},
	caption: {
		fontSize: '0.8125rem',
		fontWeight: FONT_WEIGHT_LIGHT,
		letterSpacing: '0rem'
	}
};
const theme = createTheme({
  typography: typography
  });

  
export default theme;