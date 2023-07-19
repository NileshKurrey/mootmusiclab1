import React from "react";
import "./widget.css";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMusicalNoteSharp } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { Fragment } from "react";
function Widgets({ type }) {
  let data;

  const amount = 100;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <BsFillPersonFill
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Artists":
      data = {
        title: "Artists",
        isMoney: false,
        link: "See all Artists",
        icon: (
          <IoMusicalNoteSharp
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Songs":
      data = {
        title: "Songs",
        link: "view All Songs",
        icon: (
          <RiPlayListFill
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "$"} {amount}
          </span>
        </div>
        <div className="right">
            {data.icon}
        </div>
      </div>
    </Fragment>
  );
}

export default Widgets;
