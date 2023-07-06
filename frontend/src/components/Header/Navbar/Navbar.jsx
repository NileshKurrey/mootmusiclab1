import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaUserEdit, FaGuitar } from 'react-icons/fa'
import { HiRectangleGroup } from 'react-icons/hi2'
import { IoLogOut } from 'react-icons/io5'
import { BiLogInCircle } from 'react-icons/bi'
import 'react-tippy/dist/tippy.css';
import { logout } from '../../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const userRole = 'user'
  const dispatch = useDispatch()
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });
  function logoutUser() {
    dispatch(logout());
  }
  return (
    <Fragment>

      <div className="navbar" ref={menuRef}>
        <nav className='nav'>
          <div className="logo">
            <img src={logo} className="logo-img" alt="" />
          </div>
          <div className="search">
            <div className="search-bar">
              <form className='search-form'>
                <input type="text" placeholder='search songs,artists that you love!' />
                <div className="search-btn">
                  <AiOutlineSearch />
                </div>
              </form>
            </div>
          </div>
          <div className="Links">
            <ul>
              <li><Link className='navLinks' to="/">Home</Link></li>
              <li><Link className='navLinks' to="/About">About Us</Link></li>
              <li><Link className='navLinks' to="/Contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="signIN">
            {isAuthenticated ? <img src={user.avatar} alt='profilepic' onClick={() => { setOpen(!open) }} className='profilepic' /> 
            : <div className="profileImage" onClick={() => { setOpen(!open) }}>
              <BsFillPersonFill className='pr-icon' />
            </div>}

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
              {isAuthenticated ? <ul>
                
                <DropdownItem icon={<BsFillPersonFill className='dropdown-links-icon' />}  link='/profile' text={"My Profile"} />
                <DropdownItem icon={<FaUserEdit className='dropdown-links-icon' />} link='/editProfile' text={"Edit Profile"} />
                {userRole === 'user' ? <><DropdownItem icon={<FaGuitar className='dropdown-links-icon' />} link='/becameArtist' text={"Became A Artist"} />
                  <DropdownItem icon={<HiRectangleGroup className='dropdown-links-icon' />} link='adertise' text={"Adevertise With Us"} /></> : <></>}
                <div onClick={logoutUser}>

                  <DropdownItem icon={<IoLogOut className='dropdown-links-icon' />} link='/' text={"Logout"} />
                </div>
              </ul> :
                <ul>
                  <DropdownItem icon={<BiLogInCircle className='dropdown-links-icon' />} link='/logIn' text={"Sign In"} />
                </ul>}

            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  )
}
function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      {props.icon}
      <Link className='dropdown-links' to={`${props.link}`}> {props.text}  </Link>
    </li>
  );
}

export default Navbar