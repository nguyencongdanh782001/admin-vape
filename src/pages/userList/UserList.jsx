import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUser, deleteUser } from "../../redux/userRedux";
import "./userList.css";
import { Alert, Slide, Snackbar } from "@mui/material";

export default function UserList() {
  const { listUser, isLoadingUserDelete } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteUser(id))
      if (res.meta.requestStatus === 'fulfilled') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: false, message: 'User delete successful' })
      } else if (res.meta.requestStatus === 'rejected') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: true, message: res.payload })
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getAllUser())
    }
    getUser()
  }, [dispatch, isLoadingUserDelete])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "listUser",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: 'isAdmin', headerName: "IsAdmin", width: 100 },
    { field: 'createdAt', headerName: "Created At", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row?._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row?._id)}
            />
          </>
        );
      },
    },
  ];
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
    <div className="userList">
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
      <div style={{ paddingBottom: '20px' }}>
        <Link to="/newUser" >
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={listUser}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        pagination
        checkboxSelection
      />
    </div>
  );
}
