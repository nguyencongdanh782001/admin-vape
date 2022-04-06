import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, deleteBrand, getBrand } from "../../redux/brandRedux";

import "./Brand.css";
const Brand = () => {
  const { isLoading, isLoadingAction, brand } = useSelector(
    (state) => state.brand
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        await dispatch(getBrand());
      } catch (error) {}
    };
    fetchBrand();
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Brand", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const [name, setName] = useState("");

  const handleAddBrand = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBrand({ name: name }));
      setName("");
    } catch (error) {}
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBrand(id));
    } catch (error) {}
  };
  return (
    <div className="brandPage">
      <form
        style={{
          marginBottom: "40px",
          display: "flex",
          // gap: "10px",
        }}
        onSubmit={handleAddBrand}
      >
        <div className="addProductItem">
          <label>Tên thương hiệu</label>
          <input
            type="text"
            placeholder="Brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            margin: "28px 0 0 10px",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={isLoadingAction === true ? true : false}
          >
            Thêm
          </Button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "1000px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>List brand</h1>
        <DataGrid
          rows={brand}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          rowsPerPageOptions={[8]}
          pagination
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Brand;
