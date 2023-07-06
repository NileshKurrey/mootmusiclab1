import { Fragment } from "react";
import React from "react";
import "./home.css";
import Widgets from "../../Ad-components/widgets/Widgets";
// import Feature from "../Ad-components/features/Feature";
import Table from "../../Ad-components/table/Table";
import Slider from "../../../Content/Slider/Slider";
import Sidbar from '../../Ad-components/sidebar/Sidebar'
import AdNavbar from "../../Ad-components/Navbar/AdNavbar";
function Home() {
 const titleStyle ={
    fontSize: '40px',
    color: "#a6a6a6"
  }
  return (
    <Fragment>
      <div className="home">
        <Sidbar/>
        <div className="homecontainer">
          <AdNavbar/>
          <div className="widgets">
            <Widgets type="users" />
            <Widgets type="Artists" />
            <Widgets type="Advertisers" />
            <Widgets type="Songs" />
          </div>
          <div className="Cards">
          <Slider  title = {'Most Liked Songs'}  CardsType={'Cards'} style={{width: '80vw'}} titleStyle={titleStyle}/>
          <Slider  title = {'Most Liked Artist'}  CardsType={'ArtistCard'} style={{width: '80vw'}} titleStyle={titleStyle}/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Users</div>
           <Table/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
