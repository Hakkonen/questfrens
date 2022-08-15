import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import Grid from '@mui/material/Grid';

import Home from "./components/home"
import Navbar from "./components/navbar"
import Login from "./components/login"
import Account from "./components/account"
import Market from "./components/market"
import Asset from "./components/asset"
import Feed from "./components/feed"
import Instructions from "./components/instructions"
import FooterEl from './components/footerEl';

import useWindowSize from "./components/useWindowSize"

// themes
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import { indigo, pink } from '@mui/material/colors';
// import PressStart2P from './fonts/PressStart2P.ttf'

// Dashboard
import Dashboard from "./components/dashboard"

const pixelFont =  "font-family: 'Press Start 2P', cursive;";
const darkBlue = "rgb(13,25,40)"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: indigo,
    secondary: pink,
    darkBlue: darkBlue,
    basque: "rgb(251,229,200)",
    appleRed: "rgb(255,69,58)",
    appleOrange: "rgb(255,159,10)",
    appleGreen: "rgb(48,209,88)",
    appleBlue: "rgb(10,132,255)",
    appleDarkGrey: "rgb(28,28,30)",
    background: {
      // paper: darkBlue,
      // default: darkBlue
    },
    action: {
      hover: pink,
    }
  },
  typography: {
    // h4: {
    //   fontFamily: ['"Press Start 2P"', 'cursive'].join(','),
    // },
    // fontFamily: [
    //   // "cursive",
    //   // '-apple-system',
    //   // 'BlinkMacSystemFont',
    //   // '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Press Start 2P"',
    //   // '"Apple Color Emoji"',
    //   // '"Segoe UI Emoji"',
    //   // '"Segoe UI Symbol"',
    // ].join(','),
  },
  components: {
    MuiLink: {
      color: "#FFF",
      underline: "none"
    }
  }
});

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          A generative NFT collection.
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function App() {
  const [ address, setAddress ] = useState("")
  const [ signature, setSignature ] = useState("")

  // Window size
  const size = useWindowSize();

  // COOKIEs
  useEffect(() => {
      // Get cookies
      const getCookie = (name) => {
          return document.cookie.split('; ').reduce((r, v) => {
              const parts = v.split('=')
              return parts[0] === name ? decodeURIComponent(parts[1]) : r
          }, '')
      }

      console.log(getCookie("address"))
      setAddress(getCookie("address"))
      console.log(getCookie("signature"))
      setSignature(getCookie("signature"))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="App"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Navbar theme={theme} />
      
      <Routes>
        <Route path="/" element={<Home theme={theme} windowSize={size} />} />
        <Route path="/account" element={<Account address={address} />} />
        <Route path="/feed" element={<Feed theme={theme} />} />
        <Route path="/market" element={<Market theme={theme} />} />
        <Route path="/asset" element={<Asset theme={theme} windowSize={size} />} />
        <Route path="/login" element={<Login setAddress={setAddress} setSignature={setSignature} />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;

// function createCookie(name, value, days) {
//   var expires;
//   if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//       expires = "; expires=" + date.toGMTString();
//   }
//   else {
//       expires = "";
//   }
//   document.cookie = name + "=" + value + expires + "; path=/";
// }

// function getCookie(c_name) {
//   if (document.cookie.length > 0) {
//       c_start = document.cookie.indexOf(c_name + "=");
//       if (c_start != -1) {
//           c_start = c_start + c_name.length + 1;
//           c_end = document.cookie.indexOf(";", c_start);
//           if (c_end == -1) {
//               c_end = document.cookie.length;
//           }
//           return unescape(document.cookie.substring(c_start, c_end));
//       }
//   }
//   return "";
// }