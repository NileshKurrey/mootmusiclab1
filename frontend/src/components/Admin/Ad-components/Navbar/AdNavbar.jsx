import './AdNavbar.css';
import {TbArrowBackUp} from 'react-icons/tb'
import React from 'react';
import {useNavigate} from 'react-router-dom'
const AdNavbar = () => {
  const navigate = useNavigate()
  return (
    <div className="ad-navbar">
      <div className="wrapper">
        <TbArrowBackUp onClick={(e)=>{navigate('/')}} className='GoBackIcon'/>
      </div>
    </div>
  );
};

export default AdNavbar;