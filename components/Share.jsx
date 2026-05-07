"use client";
import { useEffect, useState } from "react";
import styles from "./Share.module.css";

export default function Share() {
  const [send, setSend] = useState(false);
  const [song, setSong] = useState(0);
  const [receivedSong, setReceivedSong] = useState(0);

  const songPictures = [
    "/song-covers/BankOnTheFuneral.jpg",
    "/song-covers/CosmoSheldrake.jpg",
    "/song-covers/Downstairs.jpeg",
    "/song-covers/Fancy.png",
    "/song-covers/image8.png",
    "/song-covers/PassinMeBy.jpg",
    "/song-covers/PetroDraconic.jpg",
    "/song-covers/SZA_-_S.O.S.png",
    "/song-covers/We_Got_It_From_Here,_Thank_You_For_Your_Service.png",
  ];

  // FOR TESTING PURPOSES
  useEffect(() => {
  console.log("Current song index:", song);
}, [song]);

  // Called by button click
  // "Skips" to next song in array, and resets to beginning at end of array
  // Sets second song cover div to same song after a 2.0s delay (duration of path draw)
  function nextSong() {
    let nextValue;

    if(song < 8) {
      nextValue = song + 1;
    } else if(song >= 8) {
      nextValue = 0;
    }
    setSong(nextValue);
  }

  function prevSong() {
    let prevValue

    if(song > 0) {
      prevValue = song - 1;
    } else if(song <= 0) {
      prevValue = 8;
    }
    setSong(prevValue)
  }

  function handleSend() {
    setSend(true);
    const sendingSong = song;

    setTimeout(() => {
      setReceivedSong(sendingSong);
    }, 1500);

    setTimeout(() => {
      setSend(false);
    }, 2000)
  }


  return (
    <div
      style={{
        background: "linear-gradient(#915FFF, #190E32)",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <div>
        <p style={{
            fontFamily: "Momo Signature, cursive",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "4rem"
        }}>Share</p>
      </div>

      {/* Interactive space (outter container) */}
      <div
        style={{
          marginTop: "3rem",
          position: "relative",
        }}>

        {/* Buttons */}
        <button className={styles.sendBtn} onClick={() => handleSend()}>
          <img src="/send-icon.png"></img>
        </button>
        <button className={styles.prevBtn} onClick={() => prevSong()}>
          <img src="/prev-icon.png"></img>
        </button>
        <button className={styles.nextBtn} onClick={() => nextSong()}>
          <img src="/skip-forward-icon.png"></img>
        </button>


        {/* Pfp icons */}
        <div>
          <div style={{
            position: "absolute",
            height: "80pt",
            width: "80pt",
            left: "5.8rem",
            bottom: "100pt",
            borderRadius: "5px",
            backgroundColor: "white",
            backgroundImage: `url(${songPictures[song]})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></div>
          <div style={{
            position: "absolute",
            left: "5rem",
            bottom: "-10pt",
            height: "100pt",
            width: "100pt",
            backgroundImage: "url(/elodie-ume-pfp.jpg)",
            backgroundColor: "white",
            borderRadius: "50%",
            backgroundSize: "cover",
            border: "2px solid white"
        }}></div>


          <div style={{
            position: "absolute",
            height: "80pt",
            width: "80pt",
            top: "-4.5rem",
            right: "6rem",
            borderRadius: "5px",
            backgroundColor: "white",
            backgroundImage: `url(${songPictures[receivedSong]})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></div>
          <div style={{
            position: "absolute",
            height: "100pt",
            width: "100pt",
            top: "40pt",
            right: "5rem",
            backgroundImage: "url(/kevin-pfp.jpg)",
            backgroundColor: "white",
            borderRadius: "50%",
            backgroundSize: "cover",
            border: "2px solid white"
        }}></div>
        </div>

        {/* Path */} 
        <div>
          <style>
            {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }`}
          </style>
          <svg className={styles.arrowSvg} viewBox="0 0 500 150">
            <path
              className={styles.arrowPath}
              style={{
                animation: send ? "draw 4.0s ease forwards" : "none",
              }}
              d="M 80 140 C 300 150, 200 50, 420 30"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
