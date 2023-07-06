import React, { Fragment,useState,useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { clearErrors,login} from "../../actions/userActions";
import "./SignIn.css";
import signin from '../../assets/login.svg'
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate =useNavigate();


  const { error,isAuthenticated,loading} = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {

    if (error) {
      dispatch(clearErrors());
    }
    if(isAuthenticated){
    navigate('/')
    }
  }, [dispatch, error,isAuthenticated,navigate]);
  return (
    <Fragment>
      <div className="signBody">
        <div className="container">
          <div className="firstSide">
              <img className="login-svg" src={signin} alt="" />
          </div>
          <div className="loginSide">
            <div className="signUpData">
              <form onSubmit={loginSubmit}>
                <h1>Login to Your Account</h1>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="InputStyle"
                  placeholder="Enter Your Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="Password"
                  className="InputStyle"
                  id="password"
                  placeholder="Enter Your Password"
                  required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
              <button  className='ButtonStyle signBtn'  type="submit" >
              {loading ?
                  <>
                    LogIn
                    <CircularProgress sx={{color:'white',marginLeft:'8px'}} size='20px'/>
                  </>
                  :
                  <>
                  LogIn
                  </>
                  }
              </button>
              </form>
            </div>
            <div className="rd-signUp">
          <h4>New Here?</h4>
          <Link to='/signUp' className="link-s">Sign Up</Link>
        </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
