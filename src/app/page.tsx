"use client";

import React from "react";
import { useState } from "react";

function Container(props: any) {
    return (
        <>
            <div className="container" style={{"width": props.width}}>
                {props.children.map((child: any) => (
                    <div>
                        {child}
                    </div>
                ))}
            </div>
        </>
    )
}

export default function Home() {

  const [classes, setClasses] = useState([]);

  function getClasses() {
    fetch("http://localhost:3000/api/classes").then((res) => {
        res.text().then((text) => {
            setClasses(JSON.parse(text));
        });
    });
  }

  getClasses();

  return (
    <div className="app">
        <Container>
            {classes ? classes.map((key) => (<p>{key.name}</p>)) : <p>Loading...</p>}
        </Container>
    </div>
  )
}