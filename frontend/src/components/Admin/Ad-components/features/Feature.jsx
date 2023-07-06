import React, { Fragment } from "react";
import {
  MdMoreVert,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./feature.css";
function Feature() {
  return (
    <Fragment>
      <div className="featured">
        <div className="top">
          <h1 className="title">Total Revenue</h1>
          <MdMoreVert />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
          </div>
          <p className="title">Total sales made today</p>
          <p className="amount">$420</p>
          <p className="desc">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">
                <MdKeyboardArrowDown />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Week</div>
              <div className="itemResult positive">
                <MdKeyboardArrowUp />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult negative">
                <MdKeyboardArrowDown />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Feature;
