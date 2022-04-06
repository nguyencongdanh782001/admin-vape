import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  // deleteCategory,
  getCategory,
} from "../../redux/categoryRedux";
import "./Category.css";
const Category = () => {
  const { isLoadingAction, category } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await dispatch(getCategory());
      } catch (error) {}
    };
    fetchCategory();
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name category", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row._id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const handleAddCat = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCategory({ name: name, slug: slug }));
      setName("");
      setSlug("");
    } catch (error) {}
  };
  // const handleDelete = async (id) => {
  //   try {
  //     await dispatch(deleteCategory(id));
  //   } catch (error) {}
  // };
  return (
    <div className="categoryPage">
      <form
        style={{
          marginBottom: "40px",
          display: "flex",
          // gap: "10px",
        }}
        onSubmit={handleAddCat}
      >
        <div className="addProductItem">
          <label>Tên loại</label>
          <input
            type="text"
            placeholder="Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Slug</label>
          <input
            type="text"
            placeholder="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            marginBottom: "12px",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={isLoadingAction ? true : false}
            style={{ marginTop: "35px", marginLeft: "5px" }}
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
        <h1 style={{ marginBottom: "20px" }}>List category</h1>
        <DataGrid
          rows={category}
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

export default Category;
