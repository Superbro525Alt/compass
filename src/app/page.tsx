"use client";

import React from "react";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';


const schoolurl: string = "https://perthmodern-wa.compass.education/";

type _assignment = {
    name: string,
    due: string,
    type: string,
    subject: string,
    description: string
};

function Container(props: any) {
    return (
        <>
            <div className={"container " + props.className} style={{"width": props.width, "height": props.height, "maxHeight": props.height}}>
                {props.children ? props.children.map((child: any) => (
                    <>
                        {child.children ? child.children.map((child2: any) => (
                            <>
                                {child2.children ? child2.children.map((child3: any) => (
                                    <>
                                        {child3.children ? child3.children.map((child4: any) => (
                                            <>
                                                {child4.children ? child4.children.map((child5: any) => (
                                                    <>
                                                        {child5.children ? child5.children.map((child6: any) => (
                                                            <>
                                                                {child6}
                                                            </>
                                                        )) : <>{child5}</>}
                                                    </>
                                                )) : <>{child4}</>}
                                            </>
                                            )) : <>{child3}</>}

                                    </>
                                )) : <>{child2}</>}
                            </>
                            )) : <>{child}</>}
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
    "Notices",
    "Profile",
    "Settings"
]

function Class(props: any) {
    return (
        <div className={"class " + props.className}>
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
            <div className={"popup " + props.className}>
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

function Assignment(props: any) {
    return <>
        <div className="assignment">
            <div className="assignment-header">
                <p>{props.name}</p>
                <p>Due {new Date(props.due).toLocaleString()}</p>
            </div>
            <div className="assignment-body">
                <p>{props.type}</p>
                <p>{props.subject}</p>
                {ReactHtmlParser(props.description)}
            </div>
        </div>
    </>
}


function Report(props: any) {
    return <>
        <div className="report">
            <div className="report-header">
                <p><strong>{props.school}</strong></p>
            </div>
            <div className="report-body">
                <p>{props.name}</p>
            </div>

            <button className="download-button" onClick={() => {
                    window.open(props.url);
            }}>Download</button>

        </div>
    </>
}


var DEFAULT_SETTINGS = [
    {
        name: "Theme",
        desc: "Change the theme of the app",
        options: [
            {
                name: "Light",
                desc: "Light theme",
                value: "light"
            },
            {
                name: "Dark",
                desc: "Dark theme",
                value: "dark"
            }
        ],
        value: "dark"
    }
]

function Setting(props: any) {
    console.log(props)
    return <>
        <div className="setting">
            <div className="setting-header">
                <p><strong>{props.name}</strong></p>
            </div>
            <div className="setting-body">
                <p>{props.desc}</p>
                <select id={props.name} value={props._value} onChange={() => {console.log(this.document.getElementById(props.name).value); props.onChange(props.name, this.document.getElementById(props.name).value, props.index)}}>
                    {props.options ? props.options.map((key: any) => (<option value={key.value}>{key.name}</option>)) : <p>Loading...</p>}
                </select>
            </div>
        </div>
    </>
}

export default function Home() {

  const [classes, setClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [renderedNotices, setRenderedNotices] = useState([]);
  const [generalAssignments, setGeneralAssignments] = useState([]);
  const [assignmentAssignments, setAssignmentAssignments] = useState([]);
  const [assessmentAssignments, setAssessmentAssignments] = useState([]);
  const [practiseAssignments, setPractiseAssignments] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [tommorowsClasses, setTommorowsClasses] = useState([]);
  const [_userData, _setUserData] = useState("");
  const [settings, setSettings] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const [canFetchNotices, setCanFetchNotices] = useState(true);
  const [canFetchClasses, setCanFetchClasses] = useState(true);
  const [canFetchAssignments, setCanFetchAssignments] = useState(true);
  const [canFetchAllClasses, setCanFetchAllClasses] = useState(true);
  const [canFetchGrades, setCanFetchGrades] = useState(true);
  const [canFetchTommorowsClasses, setCanFetchTommorowsClasses] = useState(true);
  const [canFetchUserData, setCanFetchUserData] = useState(true);
  const [canFetchSettings, setCanFetchSettings] = useState(true);


  function applySettings(_settings: any) {

  }

    function setSettingsInStorage(_settings: any) {
        localStorage.setItem("settings", JSON.stringify(_settings));

        applySettings(_settings);
    }
  function getSettings() {
      if (canFetchSettings) {
          setCanFetchSettings(false);
          var _settings = localStorage.getItem("settings");
          if (_settings == null || _settings == undefined) {
                _settings = DEFAULT_SETTINGS;
                setSettingsInStorage(_settings);
          }
          else {
              _settings = JSON.parse(_settings);
          }
          setSettings(_settings);

          applySettings(_settings);
      }
  }
  function getUserData() {
      if (canFetchUserData) {
          setCanFetchUserData(false);
          fetch(window.location.href + "/api/user_data").then((res) => {
              if (res.status == 500) {
                  console.log("error");
                  return;
              }
              res.text().then(text => {
                  _setUserData(JSON.parse(text));
                  setTimeout(() => {
                      setCanFetchUserData(true);
                  }, 1000);
              });

          });

      }
  }

  function getNextDayClasses() {
      if (canFetchTommorowsClasses) {
            setCanFetchTommorowsClasses(false);
            try {
                fetch(window.location.href + "/api/tommorow_classes").then((res) => {
                    if (res.status == 500) {
                        console.log("error");
                        return;
                    }
                    res.text().then((text) => {
                        setTommorowsClasses(JSON.parse(text));
                        setTimeout(() => {
                                setCanFetchTommorowsClasses(true);
                        }, 1000);
                    });
                });
            } catch (e) {
                e.preventDefault();
                console.log(e);
            }
      }
  }
  function getGrades() {
      if (canFetchGrades) {
            setCanFetchGrades(false);
            try {
                fetch(window.location.href + "/api/reports").then((res) => {
                    if (res.status == 500) {
                        console.log("error");
                        return;
                    }
                    res.text().then((text) => {
                        setGrades(JSON.parse(text));
                        setTimeout(() => {
                                setCanFetchGrades(true);
                        }, 1000);
                    });
                });
            } catch (e) {
                e.preventDefault();
                console.log(e);
            }
      }
  }
  function getAllClasses() {
        if (canFetchAllClasses) {
            setCanFetchAllClasses(false);
            try {
                fetch(window.location.href + "/api/all_classes").then((res) => {
                    if (res.status == 500) {
                        console.log("error");
                        return;
                    }
                    res.text().then((text) => {
                        setAllClasses(JSON.parse(text));
                        setTimeout(() => {
                                setCanFetchAllClasses(true);
                        }, 1000);
                    });
                });
            } catch (e) {
                e.preventDefault();
                console.log(e);
            }
        }
  }

  function getAssignments() {
      if (canFetchAssignments) {
          setCanFetchAssignments(false);
          try {
              fetch(window.location.href + "/api/assignments").then((res) => {
                  if (res.status == 500) {
                      console.log("error");
                      return;
                  }
                  res.text().then((text) => {
                      var tasks = JSON.parse(text);
                      var _generalTasks = [];
                      var _assignmentTasks = [];
                      var _assesmentTasks = [];
                      var _practiseTasks = [];

                      for (var i = 0; i < tasks.length; i++) {
                          if (tasks[i].categoryId == 5) {
                                _assesmentTasks.push(tasks[i]);
                          } else if (tasks[i].categoryId == 1) {
                              _generalTasks.push(tasks[i]);
                          } else if (tasks[i].categoryId == 3) {
                                _assignmentTasks.push(tasks[i]);
                          } else if (tasks[i].categoryId == 4) {
                                _practiseTasks.push(tasks[i]);
                          }
                      }

                      setGeneralAssignments(_generalTasks);
                      setAssignmentAssignments(_assignmentTasks);
                      setAssessmentAssignments(_assesmentTasks);
                      setPractiseAssignments(_practiseTasks);


                      setTimeout(() => {
                          setCanFetchAssignments(true);
                      }, 1000);
                  });
              });
          } catch (e) {
              e.preventDefault();
              console.log(e);
          }
      }
  }

  function getClasses() {
      if (canFetchClasses) {
          setCanFetchClasses(false);
          try {
              fetch(window.location.href + "/api/classes").then((res) => {
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
              fetch(window.location.href + "/api/notices").then((res) => {
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
  getAssignments();
  getAllClasses();
  getGrades();
  getNextDayClasses();
  getUserData();
  getSettings();

  function settingsOnChange(name: string, value: string, index: number) {
      console.log("changed " + name)
      var _settings = settings;
      _settings[index].value = value;
      setSettings(_settings);
      setSettingsInStorage(_settings);
      console.log(_settings)
  }

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
            <div id="_general_tasks" style={{display: "none"}}>
                <Popup key="general_tasks" className="popup-vertical">
                    {generalAssignments ? generalAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"General"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                </Popup>
            </div>
            <div id="_assignment_tasks" style={{display: "none"}}>
                <Popup key="assignment_tasks" className="popup-vertical">
                    {assignmentAssignments ? assignmentAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"Assignment"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                </Popup>
            </div>
            <div id="_assessment_tasks" style={{display: "none"}}>
                <Popup key="assessment_tasks" className="popup-vertical">
                    {assessmentAssignments ? assessmentAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"Assesment"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                </Popup>
            </div>
            <div id="_practise_tasks" style={{display: "none"}}>
                <Popup key="practise_tasks" className="popup-vertical">
                    {practiseAssignments ? practiseAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"Practise"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                </Popup>
            </div>
            <div className="top-row">
                <Container width="70%" className="class-container" key="classes">
                    {classes ? classes.map((key: object) => (<Class name={key.longTitleWithoutTime} key={key.longTitleWithoutTime}/>)) : <p>Loading...</p>}
                </Container>
                <Container width="30%" key="assignments" className="assignments">
                    <div className="row-only">
                        <button className="task-button" onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("_general_tasks").style.display = "block";
                          document.getElementById("_general_tasks").children[0].style.display = "block";
                          console.log("clicked");
                        }}>
                            <p>General</p>
                        </button>
                        <button className="task-button" onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("_assignment_tasks").style.display = "block";
                          document.getElementById("_assignment_tasks").children[0].style.display = "block";
                          console.log("clicked");
                        }}>
                            <p>Assignment</p>
                        </button>
                    </div>
                    <div className="row-only">
                        <button className="task-button" onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("_assessment_tasks").style.display = "block";
                          document.getElementById("_assessment_tasks").children[0].style.display = "block";

                          console.log("clicked");
                        }}>
                            <p>Assessment</p>
                        </button>
                        <button className="task-button" onClick={(event) => {
                          event.preventDefault();
                          document.getElementById("_practise_tasks").style.display = "block";
                          document.getElementById("_practise_tasks").children[0].style.display = "block";

                          console.log("clicked");
                        }}>
                            <p>Practise Task</p>
                        </button>
                    </div>
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
            <Container className="flex-container">
                {allClasses ? allClasses.map((key: object) => (<Class name={key.subjectName} key={key.subjectName} className="big-class"/>)) : <p>Loading...</p>}
            </Container>
        </div>
        <div className="app-container" id="Assignments" style={{display: "none"}}>
            <Container className="flex-container">
                <h2>General</h2>
                {generalAssignments ? generalAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"General"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                <h2>Assignment</h2>
                {assignmentAssignments ? assignmentAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"General"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                <h2>Assessments</h2>
                {assessmentAssignments ? assessmentAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"General"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}
                <h2>Practise</h2>
                {practiseAssignments ? practiseAssignments.map((key: object) => (<Assignment name={key.name} due={key.activityStart} type={"General"} subject={key.activityName} description={key.description}/>)) : <p>Loading...</p>}

            </Container>
        </div>
        <div className="app-container" id="Grades" style={{display: "none"}}>
            <Container className="flex-container">
                {grades ? grades.map((key: object) => (<Report name={key.t} school={key.schoolName} url={schoolurl + key.l} key={key.t} className="big-class"/>)) : <p>Loading...</p>}
            </Container>
        </div>
        <div className="app-container" id="Timetable" style={{display: "none"}}>
            <div className="top-row" style={{height: "100%", maxHeight: "100%", minHeight: "100%"}}>
                <Container className="flex-container">
                    <h2>Today's Classes</h2>
                    {classes ? classes.map((key: object) => (<Class name={key.longTitleWithoutTime} key={key.longTitleWithoutTime}/>)) : <p>Loading...</p>}
                </Container>
                <Container className="flex-container">
                    <h2>Tomorrows Classes</h2>
                    {tommorowsClasses ? tommorowsClasses.map((key: object) => (<Class name={key.longTitleWithoutTime} key={key.longTitleWithoutTime}/>)) : <p>Loading...</p>}
                </Container>
            </div>
        </div>
        <div className="app-container" id="Attendance" style={{display: "none"}}>
            <Container className="attendance">
                <div className="vertical-row attendance-row">
                    <div className="period">
                        <h1>Period 0</h1>
                        <div className="attendance-box">
                            <p>Not Marked</p>
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 1</h1>
                        <div className="attendance-box">
                            {_userData ? _userData.userTimeLinePeriods[1].statusName : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 2</h1>
                        <div className="attendance-box">
                            {_userData ? _userData.userTimeLinePeriods[2].statusName : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 3</h1>
                        <div className="attendance-box">
                            {_userData ? _userData.userTimeLinePeriods[3].statusName : <p>Loading...</p>}
                        </div>
                    </div>
                </div>
                <div className="vertical-row attendance-row">
                    <div className="period">
                        <h1>Period 4</h1>
                        <div className="attendance-box">
                            {_userData ? _userData.userTimeLinePeriods[4].statusName : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 5</h1>
                        <div className="attendance-box">
                            {_userData ? _userData.userTimeLinePeriods[5].statusName : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 6</h1>
                        <div className="attendance-box">
                            { _userData ? _userData.userTimeLinePeriods[6].statusName != "" ? _userData.userTimeLinePeriods[6].statusName : <p>Not Marked</p> : <p>Loading...</p>}
                        </div>
                    </div>
                    <div className="period">
                        <h1>Period 7</h1>
                        <div className="attendance-box">
                            <p>Not Marked</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div className="app-container" id="Notices" style={{display: "none"}}>
            <Container className="notices-tab">
                {notices ? notices.map((key: object) => (<Notice contents={key.Content1} title={key.Title} key={key.Title}/>)) : <p>Loading...</p>}
            </Container>
        </div>
        <div className="app-container" id="Profile" style={{display: "none"}}>
            <Container className="profile">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={_userData ? schoolurl + _userData.userSquarePhotoPath : <p>Loading...</p>} alt="profile image" width="10%" height="10%"/>
                    </div>
                    <div className="profile-name">
                        <h1>{_userData ? _userData.userFullName : <p>Loading...</p>}</h1>
                        <h2>{_userData ? _userData.userDetails : <p>Loading...</p>}</h2>
                        <h3>{_userData ? _userData.userEmail : <p>Loading...</p>}</h3>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-row">
                        <h3>Year Level</h3>
                        <p>{_userData ? _userData.userYearLevel : <p>Loading...</p>}</p>
                    </div>
                    <div className="profile-row">
                        <h3>House</h3>
                        <p>{_userData ? _userData.userHouse : <p>Loading...</p>}</p>
                    </div>
                    <div className="profile-row">
                        <h3>Form</h3>
                        <p>{_userData ? _userData.userFormGroup : <p>Loading...</p>}</p>
                    </div>
                    <div className="profile-row">
                        <h3>Compass ID</h3>
                        <p>{_userData ? _userData.userCompassPersonId : <p>Loading...</p>}</p>
                    </div>
                </div>
            </Container>
        </div>
        <div className="app-container" id="Settings" style={{display: "none"}}>
            <Container>
                {settings ? settings.map((key: object) => (<Setting name={key.name} desc={key.desc} options={key.options} _value={key.value} index={settings.indexOf(key)} onChange={settingsOnChange}/>)) : <p>Loading...</p>}
            </Container>
        </div>

    </div>
  )
}