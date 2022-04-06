import { Alert, Backdrop, CircularProgress, Slide, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/userRedux";
import "./newUser.css";

export default function NewUser() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { isLoadingUserCreate } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(createUser({ username, password, email, isAdmin, confirmpassword: password }))
      if (res.meta.requestStatus === 'fulfilled') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: false, message: 'User create successful' })
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
    <div className="newUser">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingUserCreate}
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
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleCreate}>
        <div className="newUserItem">
          <label>Username</label>
          <input required type="text" placeholder="username" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {/* <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div> */}
        <div className="newUserItem">
          <label>Email</label>
          <input required type="email" placeholder="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input required type="password" placeholder="password" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div> */}
        {/* <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div> */}
        <div className="newUserItem">
          <label>Role</label>
          <select className="newUserSelect" name="active" id="active" onChange={(e) => setIsAdmin(e.target.value)}>
            <option value="false" defaultValue={'false'} defaultChecked>User</option>
            <option value="true">Admin</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
