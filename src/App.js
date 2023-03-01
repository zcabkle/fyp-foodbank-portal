import { ThemeProvider } from '@mui/material/styles';
import React from "react"
import ApplicationRouter from "./routing/ApplicationRouter";
import createTheme from "./theme/index.js";
import { CssBaseline } from '@mui/material';

export default function App() {

  return (
   //<div><ThemeProvider theme={createTheme()}> <CssBaseline /><ApplicationRouter /><AppBar/></ThemeProvider></div>
    <div><ThemeProvider theme={createTheme()}> <CssBaseline /><ApplicationRouter /></ThemeProvider></div>

  );
} 