"use client"
import { useState, useEffect } from "react";
import styles from "./Listen.module.css";

export default function Listen() {

const [isWiggling, setIsWiggling] = useState(false);
const [showLines, setShowLines] = useState(false);
const [showImages, setShowImages] = useState(false);


function hoverWiggle(state) {
  setIsWiggling(state);
}

useEffect(() => {
  if (showLines) {
    const timer = setTimeout(() => {
      setShowImages(true);
    }, 500);
    return () => clearTimeout(timer);
  } else {
    setShowImages(false);
  }
}, [showLines]);


  return (
    <div className={styles.page}>
        {/* Title */}
      {/* <div className={styles.title}>Listen</div>  */}

        <div className={styles.centerWrapper}>

      {/* Image */}
      <img src="/elodie.svg" className={`${styles.mainImg} ${isWiggling ? styles.wiggle: ""}`}
      onMouseEnter={()=>{hoverWiggle(true)}}
      onMouseLeave={()=>{hoverWiggle(false)}}
      onClick={()=>{setShowLines(true)}} />

      {/* dashed lines */}
      <div className={styles.lines}>
        <div className={`${styles.line} ${styles.lineTopRight} ${showLines ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineTopLeft} ${showLines ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineBottomRight} ${showLines ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineBottomLeft} ${showLines ? styles.showLine:""}`}></div>
      </div>

      {/* 4 smaller images */}
      <div className={styles.images}>
        <img src="/topright.svg" className={`${styles.smallImg} ${styles.imgTopRight} ${showImages ? styles.showImg:""}`}></img>
        <img src="/topleft.svg" className={`${styles.smallImg} ${styles.imgTopLeft} ${showImages ? styles.showImg:""}`}></img>
        <img src="/bottomright.svg" className={`${styles.smallImg} ${styles.imgBottomRight} ${showImages ? styles.showImg:""}`}></img>
        <img src="/bottomleft.svg" className={`${styles.smallImg} ${styles.imgBottomLeft} ${showImages ? styles.showImg:""}`}></img>
      </div>
     </div>

</div>
  );
}