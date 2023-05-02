export interface ThemeColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface ThemeBackground {
  default: string;
  paper: string;
}

export interface ThemeText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface Theme {
  mode: "DARK" | "LIGHT";
  primary: ThemeColor;
  secondary: ThemeColor;
  background: ThemeBackground;
  text: ThemeText;
}
