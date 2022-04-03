import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import Grid from '@mui/material/Grid';

import Navbar from "./components/navbar"
import Login from "./components/login"
import Account from "./components/account"
import Market from "./components/market"
import Feed from "./components/feed"


function Home() {

  return (
    <div
      style={{
        display: "flex", justifyContent: "center", alignItems: "center", height: "auto"
      }}
    >
      <Grid container spacing={2}
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} md={6}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <main
            style={{ maxWidth: "500px", fontSize: "1.5em" }}
          >
            Quest Frens is a dynamically generated NFT collection on the Counterparty network.
            <br></br><br></br>
            Each Quest Fren is seeded from your mint signature's unique hash, giving it it's own attributes and items.
            <br></br><br></br>
            The site is still under construction, with the following features in development:
            <ul
              style={{ textAlign: "left" }}
            >
              <li><Link to="/market">Market</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li>Combat</li>
              <li>Fren Wallet</li>
            </ul>
            <br></br>
            <br></br>
                Join the chat for more:<br></br>
                <a href="https://t.me/fren_zone" target="_blank">https://t.me/fren_zone</a>
            </main>
          </Grid>
          <Grid item xs={12} md={6}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <iframe 
              // style="border:0;" 
              width="400" height="560" 
              src={`../card/index.html?fren=1`}
            ></iframe> 
          </Grid>
      </Grid>
    </div>
  )
}

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
    <div className="App"
      style={{ backgroundColor: "rgb(45,22,61)", height: "100vh", width: "100vw" , color: "bisque" }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account address={address} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/market" element={<Market />} />
        <Route path="/login" element={<Login setAddress={setAddress} setSignature={setSignature} />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
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