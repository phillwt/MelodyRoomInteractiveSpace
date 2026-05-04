"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import DiscoverElement from "@/components/discover";

export default function Home() {
  return (
    <div>
      <DiscoverElement></DiscoverElement>
    </div>
  );
}
