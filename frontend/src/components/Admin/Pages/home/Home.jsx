import { Fragment } from "react";
import React from "react";
import "./home.css";
import Widgets from "../../Ad-components/widgets/Widgets";
// import Feature from "../Ad-components/features/Feature";
import Sidbar from '../../Ad-components/sidebar/Sidebar'
import AdNavbar from "../../Ad-components/Navbar/AdNavbar";
import UserTable from "../../Ad-components/UserTable/UserTable";
import { useSelector } from "react-redux";
// import SongTable from "../../Ad-components/songTable/SongTable";
function Home() {
 const {user} = useSelector((state)=>state.user)
  return (
    <Fragment>
      <div className="home">
        <Sidbar/>
        <div className="homecontainer">
          <AdNavbar/>
          <div className="widgets">
            <Widgets type="users" />
            <Widgets type="Artists" />
            <Widgets type="Songs" />
          </div>
          <div className="Cards">
            {/* <div className="listContainer">
              <div className="listTitle">Letest Songs</div>
              <SongTable/>
            </div> */}
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Users</div>
           <UserTable users={user}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
