"use client";

import React from "react";
import { useState } from "react";

function Container(props: any) {
    return (
        <>
            <div className="container" style={{"width": props.width, "height": props.height, "maxHeight": props.height}}>
                {props.children ? props.children.map((child: any) => (
                    <div>
                        {child}
                    </div>
                )) : <div></div>}
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
        <div className="vertical-nav" style={{marginRight: "1%", height: "98%"}}>
            <Container height="100%"/>
        </div>
        <div className="app-container">
            <div className="row">
                <Container width="70%">
                    {classes ? classes.map((key) => (<p>{key.name}</p>)) : <p>Loading...</p>}
                </Container>
                <Container width="30%">
                    {classes ? classes.map((key) => (<p>{key.name}</p>)) : <p>Loading...</p>}
                </Container>
            </div>
            <div className="row">
                <Container>
                    {classes ? classes.map((key) => (<p>{key.name}</p>)) : <p>Loading...</p>}
                </Container>
            </div>
        </div>
    </div>
  )
}