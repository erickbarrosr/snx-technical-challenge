import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#844AFF", // Cor principal (azul padrão do MUI)
    },
    secondary: {
      main: "#9c27b0", // Cor secundária (roxo padrão do MUI)
    },
    background: {
      default: "#f5f5f5", // Cor de fundo padrão
      paper: "#ffffff", // Cor de fundo para elementos tipo "paper"
    },
    text: {
      primary: "#00112B", // Cor principal do texto
      secondary: "#666666", // Cor secundária do texto
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Fonte padrão
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "500",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none", // Remove o texto em maiúsculas padrão dos botões
    },
  },
});

export default theme;
