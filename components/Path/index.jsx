"use client"
import styles from './Path.module.css';
import { useState } from 'react';
export default function Path() {

  const [play, setPlay] = useState(false);

  //d="M 100 80 C 100 200, 440 200, 440 325"
  //M startX, startY, control points, control points, endX, endY
  /*
    Control point 1: (100, 200) — pulls the curve near the start point downward (same x as start, 120px below)
    Control point 2: (440, 200) — pulls the curve near the end point from the left (same y as CP1)
  */
  return (
    <div>
      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }`
        }
      </style>
      <button onClick={() => setPlay(!play)}>Play animation</button>
      <svg className={styles.arrowSvg} viewBox="0 0 500 400">
        <path
          className={styles.arrowPath}
          style={{
            animation: play ? "draw 1.4s ease forwards" : "none"
          }}
          d="M 100 80 C 100 200, 440 200, 440 325"
        />
      </svg>
    </div>
  );
}
