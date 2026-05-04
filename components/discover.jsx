"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DiscoverElement() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const music = {
        image: ["/aespa.jpg", "/kinggizzard.jpg", "/sabcarp.jpg"],
        albumName: ["Savage - The 1st Mini Album", "Phantom Island", "Nonsense"],
        artistName: ["aespa", "King Gizzard and the Lizard Wizard", "Sabrina Carpenter"]
    }

    let im = "";
    let alb = "";
    let art = "";
    let countA = 0;

const AutoTimer = () => {
  const [count, setCount] = useState(0);

  // This is the function that triggers every 2 seconds
  const myRepeatedFunction = () => {
  
        im = music[image][1];
        alb = music[albumName][1];
        art = music[artistName][1];

    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  useEffect(() => {
    // Start the interval immediately when the component loads
    const interval = setInterval(() => {
      myRepeatedFunction();
    }, 2000);

    // Cleanup function: This is vital in React
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
}

    return (
        <div style={{
            width: "1500px",
            height: "0750px",
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        }}>
            <Image
                src="/Note.svg" // Corresponds to /public/profile.png
                alt="Music Note"
                width={250}
                height={250}
            />
            <div>
                <Image
                    src= {im} // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    style={{
                        borderRadius: "25px",
                    }} />
                <h3>`${alb}`</h3>
                <h5>`${art}`</h5>
            </div>
            <div>
                <Image
                    src="/aespa.jpg" // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    style={{
                        borderRadius: "25px",
                    }} />
                <h3>Savage - The 1st Mini Album</h3>
                <h5>aespa</h5>
            </div>
            <div>
                <Image
                    src="/kinggizzard.jpg" // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    style={{
                        borderRadius: "25px",
                    }} />
                <h3>Phantom Island</h3>
                <h5>King Gizzard and the Lizard Wizard</h5>
            </div>
            <div>
                <Image
                    src="/sabcarp.jpg" // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    style={{
                        borderRadius: "25px",
                    }} />
                <h3>Nonsense</h3>
                <h5>Sabrina Carpenter</h5>
            </div>
        </div>
    );
}
