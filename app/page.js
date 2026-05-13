"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Connect from "@/components/Connect";
import "@fontsource/momo-signature";

export default function Home() {
  return (
    <div>
      <Connect></Connect>
    </div>
  );
}
