import React from 'react'
import './myartist.css'
import Sidebar from '../../Ad-components/sidebar/Sidebar'
import Datatable from '../../Ad-components/datatable/Datatable'
import AdNavbar from '../../Ad-components/Navbar/AdNavbar'

function MyArtist() {
  return (
    <>
        <Sidebar/>
        <div className="Myartist-wrapper">
            <AdNavbar/>
            <Datatable/>
        </div>
    </>
  )
}

export default MyArtist