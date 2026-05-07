"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import DiscoverElement from "@/components/discover";

export default function Home() {
  const [component, setComponent] = useState("");
  const componentList = [<DiscoverElement></DiscoverElement>, ""]
  return (
    <div>
      <h1>Welcome to Melody Room</h1>
      <button onClick={() => {
        if (component === "") {
          setComponent(componentList[0]);
        } else {
          setComponent(componentList[1]);
        }
      }}>Switch Components</button>
      <div>{component}</div>

    </div>
  );
}
