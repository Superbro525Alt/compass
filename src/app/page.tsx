"use client";

import React from "react";
import { useState } from "react";

function Container(props: any) {
    return (
        <>
            <div className={"container " + props.className} style={{"width": props.width, "height": props.height, "maxHeight": props.height}}>
                {props.children ? props.children.map((child: any) => (
                    <>
                        {child}
                    </>
                )) : <div></div>}
            </div>
        </>
    )
}
// how do i make the element go to the top of their container?
// how do i make the element go to the bottom of their container?

function NavButton(props: any) {
    return (

            <div className="nav-button">
                <p style={{margin: "auto auto", textAlign: "center"}}>{props.text}</p>
            </div>

    )
}

const NAV_BUTTONS = [
    "Home",
    "Classes",
    "Assignments",
    "Grades",
    "Timetable",
    "Attendance",
    "Profile",
    "Settings"
]

function Class(props: any) {
    return (
        <div className="class">
            <p>{props.name}</p>
        </div>
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
            <Container height="100%" className="nav-container">
                    {NAV_BUTTONS ? NAV_BUTTONS.map((key) => (<NavButton text={key}/>)) : <p>Loading...</p>}
            </Container>
        </div>
        <div className="app-container">
            <div className="row">
                <Container width="70%">
                    {classes ? classes.map((key) => (<Class name={key.name}/>)) : <p>Loading...</p>}
                </Container>
                <Container width="30%">
                    {classes ? classes.map((key) => (<p>{"Assignments"}</p>)) : <p>Loading...</p>}
                </Container>
            </div>
            <div className="row">
                <Container>
                    {classes ? classes.map((key) => (<p>{"Notices"}</p>)) : <p>Loading...</p>}
                </Container>
            </div>
        </div>
    </div>
  )
}