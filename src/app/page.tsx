"use client";

import { useState } from "react";



export default function Home() {

  const [classes, setClasses] = useState("");

  function getClasses() {
    fetch("http://localhost:3000/api/classes").then((res) => {
        res.text().then((text) => {
            setClasses(text);
        });
    });
  }

  getClasses();

  return (
    <div>
      {classes ? <p>{classes}</p> : <p>Loading...</p>}
    </div>
  )
}