"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Path from "@/components/Path";

export default function Home() {
  return (
    <div>
      <Path />
    </div>
  );
}
