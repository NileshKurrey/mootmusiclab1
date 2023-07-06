import React from "react";
import "./widget.css";
import { BsFillPersonFill, BsShop } from "react-icons/bs";
import { MdMonetizationOn, MdKeyboardArrowUp } from "react-icons/md";
import { Fragment } from "react";
function Widgets({ type }) {
  let data;

  const amount = 100;
  const diff = 20;

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
          <BsShop
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Advertisers":
      data = {
        title: "Adertisers",
        isMoney: true,
        link: "view All Adertisers",
        icon: (
          <MdMonetizationOn
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break
    case "Songs":
      data = {
        title: "Songs",
        link: "view All Songs",
        icon: (
          <MdMonetizationOn
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
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          <div className="percantage postive">
            <MdKeyboardArrowUp />
            {diff} %
          </div>
            {data.icon}
        </div>
      </div>
    </Fragment>
  );
}

export default Widgets;
