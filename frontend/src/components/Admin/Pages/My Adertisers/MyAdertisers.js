import React from 'react'
import './MyAdertiser.css'
import Sidebar from '../../Ad-components/sidebar/Sidebar'
import Datatable from '../../Ad-components/datatable/Datatable'
import AdNavbar from '../../Ad-components/Navbar/AdNavbar'

function MyAdertisers() {
  return (
    <>
    <Sidebar/>
    <div className='MyAdertiser_wrapper'>
        <AdNavbar/>
        <Datatable/>
    </div>
    </>
  )
}

export default MyAdertisers