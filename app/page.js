"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import DiscoverElement from "@/components/discover";
import Listen from "@/components/Listen";
import Share from "@/components/Share";
import Connect from "@/components/Connect";


export default function Home() {
  const [component, setComponent] = useState(<DiscoverElement></DiscoverElement>);
  const componentList = [<DiscoverElement></DiscoverElement>, <Listen></Listen>, <Share></Share>, <Connect></Connect>];
  const buttonList = ["Discover", "Listen", "Share", "Connect"];
  const [buttonText, setButtonText] = useState("Discover")
  const [componentNum, setComponentNum] = useState(1);


  function Update() {
    if (componentNum < componentList.length - 1) {
      setComponentNum(componentNum + 1);
    } else {
      setComponentNum(0);
    }
    setComponent(componentList[componentNum]);
    setButtonText(buttonList[componentNum]);
  }

  return (
    <div>

      <header style={{
        background: "linear-gradient(#915FFF 0%, #190E32 100%)",
        display: "flex",
        // gap: "2rem",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}>

        <img src="/Logo-White.svg" style={{
          height: "4rem",
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem"
        }}></img>

          <h1 style={{
            fontSize: "4rem",
            textAlign: "center",
            marginTop: "1rem"
          }}>Welcome to MelodyRoom</h1>

        {/* <h2 style={{
          fontSize: "2rem",
          textAlign: "center",
          marginTop: "0.25rem"
        }}>Your music is a vibe, why keep it to yourself?</h2> */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          marginTop: "2rem",
          marginBottom: "1rem"
        }}>
          <h3 style={{
            fontSize: "2rem",
          }}>With MelodyRoom you can</h3>

          <button style={{
            fontSize: "2rem",
            padding: "0.5rem",
            borderRadius: "15px",
            backgroundColor: "#190E32",
            fontFamily: "Momo Signature, cursive",
            fontWeight: 400,
            fontStyle: "normal",
          }} onClick={() => {
            Update();
          }}>{buttonText}</button>
        </div>

      </header>

      <main style={{
      }}>{component}
      </main>

      <footer>

      </footer>

    </div>
  );
}
