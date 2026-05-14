"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./discoverstyle.css";


export default function DiscoverElement() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [notePadding, setNotePadding] = useState(0);
    const [noteColor, setNoteColor] = useState("");
    const musicList = {
        image: ["/aespa.jpg", "/kinggizzard.jpg", "/sabcarp.jpg", "/charli.png", "/kendrick.png"],
        albumName: ["Savage - The 1st Mini Album", "Phantom Island", "Nonsense", "brat", "To Pimp A Butterfly"],
        artistName: ["aespa", "King Gizzard and the Lizard Wizard", "Sabrina Carpenter", "Charli xcx", "Kendrick Lamar"],
        artistText: ["aespa is a South Korean girl group formed by SM Entertainment. Known for blending futuristic concepts with powerful vocals and choreography, the group includes Karina, Winter, Giselle, and Ningning. Their hit songs, including “Next Level” and “Supernova,” have made them global K-pop stars with a rapidly growing international fanbase.",
            "King Gizzard & the Lizard Wizard is an Australian experimental rock band celebrated for its genre-blending sound and prolific output. Formed in Melbourne in 2010, the group explores psychedelic rock, jazz, metal, and electronic music. Known for energetic live performances and ambitious concept albums, they have built a passionate global fan community over time.",
            "Sabrina Carpenter is an American singer, songwriter, and actress known for her catchy pop music and charismatic performances. Rising to fame through television before launching a successful music career, she gained widespread attention with hits like “Espresso” and “Please Please Please,” earning a strong global fanbase and critical recognition in recent years.",
            "Charli XCX is a British pop artist known for futuristic production, experimental songwriting, and influential collaborations. Rising from underground electronic music scenes, she became a major force in hyperpop and mainstream pop alike. Her bold visuals, innovative albums, and energetic performances have earned critical acclaim and a devoted international fanbase.",
            "Kendrick Lamar is an American rapper and songwriter acclaimed for complex lyricism, storytelling, and socially conscious themes. Emerging from Compton, California, he gained worldwide recognition through critically celebrated albums blending hip hop, jazz, and funk influences. His music explores identity, inequality, fame, and resilience, earning numerous awards and widespread cultural influence."
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

    useEffect(() => {
        let interval = null;

        if (isPaused === false) {
            setNotePadding(20);
            setNoteColor("");
            // Run every 20ms (20ms * 100 steps = 2000ms total)
            interval = setInterval(() => {
                setProgressBar((progressBar) => {
                    if (progressBar < 100) {
                        return progressBar + 1;
                    } else {
                        // When we hit 100, reset progress and trigger song change
                        switchSongs(count);
                        if (count < 4) {
                            setCount(count + 1)
                        } else {
                            setCount(0)
                        }
                        return 0;
                    }
                });
            }, 20); // 20ms for smooth 2-second loop
        } else if (isPaused) {
            setNotePadding(50);
            setNoteColor("#915FFF");
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    })

    useEffect(() => {
        if (count === 0) {
            setMusicText(musicList["artistText"][musicList.artistText.length - 1]);
        } else {
            setMusicText(musicList["artistText"][count - 1]);
        }
    }, [isHovered])

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            background: "linear-gradient(#190E32 0%,  #915FFF 100%)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "baseline",
            paddingTop: "100px",
            paddingBottom: "100px",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
            }}>
                <Image
                    src="/Note.svg"
                    alt="Music Note"
                    width={300}
                    height={300}
                    onClick={() => {
                        if (isPaused) {
                            setIsPaused(false);
                        } else {
                            setIsPaused(true);
                        }
                    }}
                    style={{
                        padding: `${notePadding}px`,
                        backgroundColor: `${noteColor}`,
                        borderRadius: "25px",
                        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.5)",
                        transition: "background-color 0.2s ease-in-out, padding 0.2s ease-in-out",
                    }}
                />
                <p>Click on Icon to pause scroll</p><p>& Hover over song for more info</p>
            </div>

            <div style={{

            }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        overflow: "hidden",
                        maxWidth: isHovered ? "600px" : "340px",
                        transition: "max-width 0.5s ease-in-out",
                        margin: " 25px",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div>
                        <Image
                            src={musicImage}
                            alt="Music Note"
                            width={300}
                            height={300}
                            style={{
                                borderRadius: "25px",
                                border: "white, solid, 10px",
                                boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.5)",
                            }}
                        />
                        <h3 style={{
                            margin: "5px",
                        }}>{musicAlbum}</h3>
                        <h5 style={{
                            margin: "5px",
                        }}>{musicArtist}</h5>
                        <div style={{
                            width: `${progressBar}%`,
                            height: "25px",
                            background: "linear-gradient(to right, #D9D9D9, #915FFF)",
                            borderRadius: "12.5px",
                            marginTop: "10px",
                        }}></div>
                    </div>

                    <p
                        style={{
                            width: "250px",
                            fontSize: "14px",
                            color: "white",
                            marginTop: "10px",
                            /* Animation properties */
                            transition: "all 0.5s ease-in-out",
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "translateY(10px)" : "translateY(0)",
                            maxHeight: isHovered ? "200px" : "0px",
                            overflow: "hidden"
                        }}>{musicText}</p>
                </div>
            </div>
        </div>
    );
}
