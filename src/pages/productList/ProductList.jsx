import { DeleteOutline } from "@mui/icons-material";
import { Alert, Slide, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProduct } from "../../redux/productRedux";
import "./productList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { product, isLoadingDelete } = useSelector((state) => state.product);

  useEffect(() => {
    const getAllProduct = async () => {
      await dispatch(getProduct());
    };
    getAllProduct();
  }, [dispatch, isLoadingDelete]);

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteProduct(id));
      if (res.meta.requestStatus === "fulfilled") {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: false, message: "Product delete successful" });
      } else if (res.meta.requestStatus === "rejected") {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: true, message: res.payload });
      }
    } catch (error) {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.image[0].image}
              alt=""
            />
            {params.row?.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row?.category?.name}</div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.brand.name}</div>;
      },
    },

    { field: "instock", headerName: "Stock", width: 200 },
    { field: "capacity", headerName: "Capacity", width: 200 },
    { field: "nicotine", headerName: "Nicotine", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
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
    message: "",
  });
  const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="productList">
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={transition ? transition.name : ""}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleClose}
          severity={notify.isValid ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={product}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={100}
        rowsPerPageOptions={[8]}
        pagination
        checkboxSelection
      />
    </div>
  );
}
