"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DiscoverElement() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const musicList = {
        image: ["/aespa.jpg", "/kinggizzard.jpg", "/sabcarp.jpg"],
        albumName: ["Savage - The 1st Mini Album", "Phantom Island", "Nonsense"],
        artistName: ["aespa", "King Gizzard and the Lizard Wizard", "Sabrina Carpenter"],
        artistText: ["aespa is a South Korean girl group formed by SM Entertainment. Known for blending futuristic concepts with powerful vocals and choreography, the group includes Karina, Winter, Giselle, and Ningning. Their hit songs, including “Next Level” and “Supernova,” have made them global K-pop stars with a rapidly growing international fanbase.",
            "King Gizzard & the Lizard Wizard is an Australian experimental rock band celebrated for its genre-blending sound and prolific output. Formed in Melbourne in 2010, the group explores psychedelic rock, jazz, metal, and electronic music. Known for energetic live performances and ambitious concept albums, they have built a passionate global fan community over time.",
            "Sabrina Carpenter is an American singer, songwriter, and actress known for her catchy pop music and charismatic performances. Rising to fame through television before launching a successful music career, she gained widespread attention with hits like “Espresso” and “Please Please Please,” earning a strong global fanbase and critical recognition in recent years."
        ]
    }
    let [musicImage, setMusicImage] = useState("/aespa.jpg");
    let [musicAlbum, setMusicAlbum] = useState("Savage - The 1st Mini Album");
    let [musicArtist, setMusicArtist] = useState("aespa");
    let [musicText, setMusicText] = useState("");
    const [progressBar, setProgressBar] = useState(0);

    const [count, setCount] = useState(1);

    function switchSongs(int) {
        setMusicImage(musicList["image"][int]);
        console.log(setMusicImage);
        setMusicAlbum(musicList["albumName"][int]);
        console.log(setMusicAlbum);
        setMusicArtist(musicList["artistName"][int]);
        console.log(setMusicArtist);
    };

    // useEffect(() => {
    //     if(isPaused === false){
    //       const interval = setInterval(() => {
    //         if (count < 2) {
    //             setCount(count + 1)

    //         } else {
    //             setCount(0)
    //         }
    //         switchSongs(count);
    //     }, 2000);
    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //         }
    //     };  
    //     }

    // })

    useEffect(() => {
        let interval = null;

        if (isPaused === false) {
            // Run every 20ms (20ms * 100 steps = 2000ms total)
            interval = setInterval(() => {
                setProgressBar((progressBar) => {
                    if (progressBar < 100) {
                        return progressBar + 1;
                    } else {
                        // When we hit 100, reset progress and trigger song change
                        switchSongs(count);
                        if (count < 2) {
                            setCount(count + 1)
                        } else {
                            setCount(0)
                        }
                        return 0;
                    }
                });
            }, 20); // 20ms for smooth 2-second loop
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    })

    return (
        <div style={{
            width: "1500px",
            height: "0750px",
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        }}>
            <div>
                <Image
                    src="/Note.svg" // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    onClick={() => {
                        if (isPaused) {
                            setIsPaused(false);
                        } else {
                            setIsPaused(true);
                        }
                    }}
                />
                <p>Click on Icon to pause scroll</p>
            </div>

            <div>
                <Image
                    src={musicImage} // Corresponds to /public/profile.png
                    alt="Music Note"
                    width={250}
                    height={250}
                    style={{
                        borderRadius: "25px",
                    }}
                    onMouseEnter={() => {
                        if (isPaused) {
                            if (count === 0) {
                                setMusicText(musicList["artistText"][musicList.artistText.length-1]);
                            } else {
                                setMusicText(musicList["artistText"][count-1]);
                            }
                        }
                    }}
                    onMouseLeave={() => {
                        setMusicText("");
                    }} />
                <h3>{musicAlbum}</h3>
                <h5>{musicArtist}</h5>
                <div style={{
                    width: `${progressBar}%`,
                    height: "25px",
                    backgroundColor: "red",
                    borderRadius: "12.5px",
                }}></div>
                <p style={{
                    width: "250px"
                }}>{musicText}</p>
            </div>
        </div>
    );
}
