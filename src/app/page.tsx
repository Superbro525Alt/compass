"use client";

import React from "react";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';

import Image from 'next/image';

import three_dots from "./images/three dots.png";


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

            <div className="nav-button" onClick={() => {OpenTab(props.text)}}>
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

function Notice(props: any) {
    return (
        <div className="notice">
            {ReactHtmlParser(props.title)}
            <br/> <br/>
            {ReactHtmlParser(props.contents)}
        </div>
    )
}


function Popup(props: any) {
    return (
        <div className="_popup">
            <div className="popup">
                {props.children ? props.children.map((child: any) => (
                    <>
                        {child}
                    </>
                )) : <div></div>}
            </div>
            <button className="close-button" onClick={() => {
                    document.getElementById("notices_popup").style.display = "none";
                }}>Close</button>
        </div>
    )
}

function OpenTab(tab: String) {
    for (var i = 0; i < NAV_BUTTONS.length; i++) {
        document.getElementById(NAV_BUTTONS[i]).style.display = "none";
    }
    document.getElementById(tab).style.display = "flex";

    var popups = []
    for (var i = 0; i < document.getElementsByClassName("_popup").length; i++) {
        popups.push(document.getElementsByClassName("_popup")[i]);
    }
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = "none";
    }
}

export default function Home() {

  const [classes, setClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [renderedNotices, setRenderedNotices] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [canFetchNotices, setCanFetchNotices] = useState(true);
  const [canFetchClasses, setCanFetchClasses] = useState(true);
  function ViewMoreNotices() {
      setLoaded(true);
      return (
          <button className="view-more" onClick={(event) => {
              event.preventDefault();
              document.getElementById("notices_popup").style.display = "block";
              console.log("clicked");
          }}>
              <p>View More</p>
          </button>

      )

  }

  function getClasses() {
      if (canFetchClasses) {
          setCanFetchClasses(false);
          try {
              fetch("http://localhost:3000/api/classes").then((res) => {
                  if (res.status == 500) {
                      console.log("error");
                      return;
                  }
                  res.text().then((text) => {
                      let classes = JSON.parse(text);
                      // sort bu time in key.finish
                      classes.sort((a: any, b: any) => {
                          if (a.finish > b.finish) {
                              return 1;
                          }
                          if (a.finish < b.finish) {
                              return -1;
                          }
                          return 0;
                      });
                      setClasses(classes);

                      setTimeout(() => {
                            setCanFetchClasses(true);
                      }, 1000);
                  });
              });
          } catch (e) {
              e.preventDefault();
              console.log(e);
          }
      }
  }



  function getNotices() {
      if (canFetchNotices) {
          setCanFetchNotices(false);
          try {
              console.log("fetching")
              fetch("http://localhost:3000/api/notices").then((res) => {
                  if (res.status == 500) {
                      console.log("error");
                      return;
                  }
                  res.text().then((text) => {
                      setNotices(JSON.parse(text));
                      var _renderedNotices = [];
                      for (var i = 0; i < JSON.parse(text).length; i++) {
                          if (i == 3) {
                              break;
                          }
                          _renderedNotices.push(JSON.parse(text)[i]);
                      }

                      setRenderedNotices(_renderedNotices);

                      setTimeout(() => {
                            setCanFetchNotices(true);
                      }, 1000);
                  });
              });
          } catch (e) {
              e.preventDefault();
              console.log(e);
          }
      }
  }

  getClasses();
  getNotices();

  return (
    <div className="app">
        <div className="vertical-nav" style={{marginRight: "1%", height: "98%"}}>
            <Container height="100%" className="nav-container" key="nav_container">
                    {NAV_BUTTONS ? NAV_BUTTONS.map((key) => (<NavButton text={key} key={key}/>)) : <p>Loading...</p>}
            </Container>
        </div>
        <div className="app-container" id="Home">
            <div id="notices_popup" style={{display: "none"}}>
                <Popup key="notices_popup">
                    {notices ? notices.map((key: object) => (<Notice contents={key.Content1} title={key.Title} key={key.Title}/>)) : <p>Loading...</p>}
                </Popup>
            </div>
            <div className="row">
                <Container width="70%" className="class-container" key="classes">
                    {classes ? classes.map((key: object) => (<Class name={key.longTitleWithoutTime} key={key.longTitleWithoutTime}/>)) : <p>Loading...</p>}
                </Container>
                <Container width="30%" key="assignments">
                    {notices ? notices.map((key: object) => (<p>Assignments</p>)) : <p>Loading...</p>}
                </Container>
            </div>
            <div className="row-nospace">
                <Container className="notices-container" height="30%" key="notices">
                    {renderedNotices ? renderedNotices.map((key: object) => (<Notice contents={key.Content1} title={key.Title} key={key.Title}/>)) : <p>Loading...</p>}
                    <button className="view-more" onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("notices_popup").style.display = "block";
                          document.getElementById("notices_popup").children[0].style.display = "block";
                          console.log("clicked");
                    }}>
                        <p>View More</p>
                    </button>
                </Container>
            </div>
        </div>
        <div className="app-container" id="Classes" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Assignments" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Grades" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Timetable" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Attendance" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Profile" style={{display: "none"}}>
        </div>
        <div className="app-container" id="Settings" style={{display: "none"}}>
        </div>

    </div>
  )
}