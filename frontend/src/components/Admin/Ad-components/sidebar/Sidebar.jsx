import React from "react";
import "./sidbar.css";
import {
  MdDashboard,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCreditCard, AiOutlineLogout, AiFillProfile } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { RiBankCard2Fill } from "react-icons/ri";
import { FaGuitar, FaCloudUploadAlt, FaList } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "../../../../actions/userActions";
import {useDispatch, useSelector } from "react-redux";
import logo from '../../../../assets/logo.png'

function Sidebar() {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const {  user } = useSelector((state) => state.user);
  const isAdmin = true
  const userRole = 'admin'

  const logoutUser =()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="Adnavbar">
      <div className="top">
        <Link to='/profile' style={{ textDecoration: "none" }}>
          <img className="ad-logo" src={logo} alt="" />
        </Link>
      </div>
      <hr />
      <div className="profilPic-wrapper">
        <img src={user.avatar} alt="" className="profilpic" />
        <h3 className="ad_title_name">{user.name}</h3>
      </div>
      <div className="center">
        <ul className="adUlList">

          {isAdmin ? <><p className="title">Main</p>
            <Link to='/profile' style={{ textDecoration: 'none' }} >
              <li className="adList">
                <MdDashboard className="icon" />
                <span> DashBoard </span>
              </li>

            </Link></> :
            <>
              {userRole === 'Artists' ? <>
                <p className="title">Main</p>
                <Link to='/My-AdeverTisers' style={{ textDecoration: 'none' }}>
                  <li className="adList" >
                    <BsPeopleFill className="icon" />
                    <span> My Adertisers </span>
                  </li>
                </Link>
              </> : userRole === 'advertiser' ? <>
                <p className="title">Main</p>
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <li className="adList" >
                    <BsPeopleFill className="icon" />
                    <span> My Artist </span>
                  </li>
                </Link>
              </> : <></>}
            </>}
          {isAdmin ? <><p className="title">People</p>
            <Link to='/profile/users' style={{ textDecoration: 'none' }}>
              <li className="adList">
                <FaUserCircle className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to='/profile/Artist' style={{ textDecoration: 'none' }}>
              <li className="adList">
                <FaGuitar className="icon" />
                <span>Artists</span>
              </li>
            </Link>
            <Link to='/profile/Advertisers' style={{ textDecoration: 'none' }}>
              <li className="adList">
                <AiFillCreditCard className="icon" />
                <span>Advertisers</span>
              </li>
            </Link></> : <>{userRole === 'Artists' ? <>
              <p className="title">For Work</p>
              <Link to='/proposals' style={{ textDecoration: 'none' }}>
                <li className="adList" >
                  <MdMessage className="icon" />
                  <span> Proposals  </span>
                </li>
              </Link>
            </> : userRole === 'advertiser' ? <>
              <p className="title">For Work</p>
              <Link to='/proposals' style={{ textDecoration: 'none' }}>
                <li className="adList" >
                  <AiFillProfile className="icon" />
                  <span> proposals Sent </span>
                </li>
              </Link>
            </> : <></>}</>}


          <p className="title">Music</p>
          {isAdmin?<><Link to='/profile/Songs' style={{ textDecoration: 'none' }}>
            <li className="adList">
              <IoStatsChartSharp className="icon" />
              <span>Songs</span>
            </li>
          </Link></>:<></>}
          
          <Link to='/profile/Upload' style={{ textDecoration: 'none' }}>
            <li className="adList">
              <FaCloudUploadAlt className="icon" />{" "}
              <span>Upload</span>
            </li>
          </Link>
          <li className="adList">
            <FaList className="icon" />
            <span>My Music</span>
          </li>

          <p className="title">Me</p>
          <Link to='/profile/ProfileDetails' style={{ textDecoration: 'none' }}>
            <li className="adList">
              <AiOutlineLogout className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          {userRole === 'Artists' ? <><Link to='/artist/account' style={{ textDecoration: 'none' }}>
            <li className="adList">
              <RiBankCard2Fill className="icon" />
              <span>Account Details</span>
            </li>
          </Link></> : <></>}
          
            <li className="adList" onClick={logoutUser}>
              <AiOutlineLogout className="icon" />
              <span>Logout</span>
            </li>
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;
