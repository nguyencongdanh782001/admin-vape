import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid
} from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { getDetailUser, updateUser } from "../../redux/userRedux";
import "./user.css";
export default function User() {
  const dispatch = useDispatch()
  const { userDetail, isLoadingUserUpdate } = useSelector(state => state.user)
  const location = useLocation()

  const id = location.pathname.split('/')[2]

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const getUser = async (id) => {
      const res = await dispatch(getDetailUser(id))
      await setUsername(res.payload?.username)
      await setEmail(res.payload?.email)
    }
    getUser(id)
  }, [dispatch, id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(updateUser({ id: id, value: { username, email } }))
      if (res.meta.requestStatus === 'fulfilled') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: false, message: 'User update successful' })
      } else if (res.meta.requestStatus === 'rejected') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: true, message: res.payload })
      }
    } catch (error) {

    }
  }

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [notify, setNotify] = useState({
    isValid: false,
    message: ''
  })
  const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="user">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingUserUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key={transition ? transition.name : ''}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity={notify.isValid ? 'error' : 'success'} sx={{ width: '100%' }}>
          {notify.message}
        </Alert>
      </Snackbar>
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={userDetail?.img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userDetail.username}</span>
              <span className="userShowUserTitle">{userDetail?.isAdmin ? 'admin' : 'user'}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetail?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">7.8.2001</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetail?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Sai Gon | VN</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleUpdate}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  required
                  type="text"
                  value={username}
                  placeholder={userDetail?.username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  required
                  type="text"
                  value={email}
                  placeholder={userDetail?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={userDetail?.img}
                  alt=""
                />
                {/* <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} /> */}
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
