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
        gap: "2rem",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}>

        <h1 style={{
          fontSize: "5rem",
        }}>Welcome to Melody Room</h1>

        <h2 style={{
          fontSize: "2.5rem",
        }}>Your music is a vibe, why keep it to yourself?</h2>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}>
          <h3 style={{
            fontSize: "2rem",
          }}>With Melody Room you can</h3>

          <button style={{
            fontSize: "2rem",
            padding: "0.5rem",
            borderRadius: "25%",
            backgroundColor: "#190E32"
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
