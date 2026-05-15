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
  // Shows index of current song in console
  useEffect(() => {
  console.log("Current song index:", song);
}, [song]);

  // Called by nextBtn click
  // "Skips" to next song in array, and resets to beginning at end of array
  function nextSong() {
    let nextValue;

    if(song < 8) {
      nextValue = song + 1;
    } else if(song >= 8) {
      nextValue = 0;
    }
    setSong(nextValue);
  }

  // Called by prevBtn click
  // Goes to previous song in array, and resets to end of array at index 0
  function prevSong() {
    let prevValue

    if(song > 0) {
      prevValue = song - 1;
    } else if(song <= 0) {
      prevValue = 8;
    }
    setSong(prevValue)
  }

  // Call by sendBtn click
  // Begins line draw animation by setting send=true
  // Sets Kevin's song cover image to the "sent" img after 1.5s (approx. duration of line draw animation)
  // Sets send=false after 2.0s to make line disappear
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
        background: "linear-gradient(#190E32 0%,  #915FFF 100%)",
        minHeight: "80vh",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      {/* <div>
        <p style={{
            fontFamily: "Momo Signature, cursive",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "4rem"
        }}>Share</p>
      </div> */}

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
          {/* Elodie */}
          <div style={{
            position: "absolute",
            height: "100pt",
            width: "100pt",
            left: "7rem",
            bottom: "155pt",
            borderRadius: "5px",
            backgroundColor: "white",
            backgroundImage: `url(${songPictures[song]})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0px 4px 5.8px 0px rgba(0, 0, 0, 0.3)"
          }}></div>
          <div style={{
            position: "absolute",
            left: "5rem",
            bottom: "-10pt",
            height: "150pt",
            width: "150pt",
            backgroundImage: "url(/elodie-ume-pfp.jpg)",
            backgroundColor: "white",
            borderRadius: "50%",
            backgroundSize: "cover",
            border: "2px solid white"
        }}></div>

          {/* Other user (Kevin?) */}
          <div style={{
            position: "absolute",
            height: "100pt",
            width: "100pt",
            top: "-3.5rem",
            right: "12.2rem",
            borderRadius: "5px",
            backgroundColor: "white",
            backgroundImage: `url(${songPictures[receivedSong]})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0px 4px 5.8px 0px rgba(0, 0, 0, 0.3)"
          }}></div>
          <div style={{
            position: "absolute",
            height: "150pt",
            width: "150pt",
            top: "70pt",
            right: "10rem",
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
              d="M 80 132 C 300 130, 200 50, 420 40"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
