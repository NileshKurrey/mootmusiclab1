import React, { Fragment } from 'react'
import './list.css'
import Sidebar from '../../Ad-components/sidebar/Sidebar'
import Datatable from '../../Ad-components/datatable/Datatable'
import AdNavbar from "../../Ad-components/Navbar/AdNavbar";
function List() {
  return (
    <Fragment>
      <div className="list">
        <Sidebar/>
        <div className="list_Container">
          <AdNavbar/>
          <Datatable/>
        </div>
      </div>
    </Fragment>
  )
}

export default List