import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import defualtPreview from '../../assets/person.png'
import { Link, useNavigate } from 'react-router-dom'
import signUp from '../../assets/signIn.svg'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userActions'
import { storage } from '../../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated ,loading} = useSelector(
    (state) => state.user
  );
  const [progress, setProgress] = useState(null)

  const [user, setUser] = useState({
    name: "",
    password: '',
    email: '',
    avatar: ''
  });
  const [file, setFile] = useState('')
  const { name, email, password, avatar } = user;

  const signSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set('name', name);
    myform.set('email', email);
    myform.set('password', password);
    myform.set("avatar", avatar);
    dispatch(register(myform))
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const uploadfile = () => {

      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `profilePics/${fileName} `);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploaded)
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUser((prev) => ({ ...prev, avatar: url }))
          });
        });
    }
    file && uploadfile()
  }, [file])
  useEffect(() => {

    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/')
    }
  }, [dispatch, navigate, error, isAuthenticated]);
  return (
    <Fragment>
      <div className="signBody">
        <div className="container">
          <div className="loginSide">
            <div className="signUpData">
              <form
                onSubmit={signSubmit}
                encType="multipart/form-data">
                <h1>Welcome</h1>
                <div className="registerImage">
                  {
                    progress !== null && progress < 100  && {name:'',email:'',password:''}  ? <div className="previewImage">
                      <img
                        src={file ? URL.createObjectURL(file) : defualtPreview}
                        alt="" style={{ opacity: 0.5 }} />
                      <CircularProgress sx={{
                        position: 'absolute', left: "40px", top: "40px", color: '#FFDE59'
                      }} value={progress}variant="determinate"  />
                      <span style={{ position: 'absolute', top: '50px', left: '47px', color: '#FFDE59', fontWeight: 'bold' }}>{`${progress}%`}</span>
                    </div> : <img
                      src={file ? URL.createObjectURL(file) : defualtPreview}
                      alt="" />
                  }


                  <input type="file"
                    name="avatar"
                    accept='image/*'
                    id=""
                    onChange={(e) => setFile(e.currentTarget.files[0])}
                  />
                </div>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className='InputStyle'
                  required
                  onChange={registerDataChange}
                  value={name}
                  placeholder="Enter Your Full Name"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className='InputStyle'
                  required
                  onChange={registerDataChange}
                  placeholder="Enter Your Email"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  className='InputStyle'
                  value={password}
                  onChange={registerDataChange}
                />


                <button disabled={progress !== null && progress < 100} className={progress !== null && progress < 100?'ButtonStyle btn-disabled':'ButtonStyle signBtn'} type="submit" >
                  {loading ?
                  <>
                    Register
                    <CircularProgress sx={{color:'white',marginLeft:'8px'}} size='20px'/>
                  </>
                  :
                  <>
                  Register
                  </>
                  }
                </button>
              </form>
            </div>
            <div className="rd-signUp">
              <h4>Already Have a Account?</h4>
              <Link to='/logIn' className="link-s">Login</Link>
            </div>
          </div>
          <div className="firstSide">
            <img className="sign-svg" src={signUp} alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

