"use client"
import { useState, useEffect } from "react";
import styles from "./Listen.module.css";

export default function Listen() {

const [isWiggling, setIsWiggling] = useState(false);
const [isActive, setIsActive] = useState(false);

console.log("styles:", styles);
  return (
    <div className={styles.page}>
        {/* Title */}
      <div className={styles.title}>Listen</div> 

        <div className={styles.centerWrapper}>

      {/* Image */}
      <img src="/elodie.svg" className={`${styles.mainImg} ${isWiggling ? styles.wiggle: ""}`}
      onMouseEnter={()=>{console.log("hover"); setIsWiggling(true)}}
      onMouseLeave={()=>{console.log("leave");setIsWiggling(false)}}
      onClick={()=>{console.log("click");setIsActive(true)}} />

      {/* dashed lines */}
      <div className={styles.lines}>
        <div className={`${styles.line} ${styles.lineTopRight} ${isActive ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineTopLeft} ${isActive ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineBottomRight} ${isActive ? styles.showLine:""}`}></div>
        <div className={`${styles.line} ${styles.lineBottomLeft} ${isActive ? styles.showLine:""}`}></div>
      </div>
     </div>

{/* 4 smaller images */}
      <div className={styles.images}>
        <img src="/topright.svg" className={`${styles.smallImg} ${styles.imgTopRight} ${isActive ? styles.showImg:""}`}></img>
        <img src="/topleft.svg" className={`${styles.smallImg} ${styles.imgTopLeft} ${isActive ? styles.showImg:""}`}></img>
        <img src="/bottomright.svg" className={`${styles.smallImg} ${styles.imgBottomRight} ${isActive ? styles.showImg:""}`}></img>
        <img src="/bottomleft.svg" className={`${styles.smallImg} ${styles.imgBottomLeft} ${isActive ? styles.showImg:""}`}></img>
      </div>

</div>
  );
}