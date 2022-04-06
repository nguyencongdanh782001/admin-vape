import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanner, deleteBanner, getBanner } from "../../redux/bannerRedux";
import "./Banner.css";

const Banner = () => {
  const { isLoading, isLoadingAction, banner } = useSelector(
    (state) => state.banner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        await dispatch(getBanner());
      } catch (error) {}
    };
    fetchBanner();
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Image",
      width: 400,
      height: 400,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.image} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
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

  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vape-store");
    try {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/danh7181/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      await dispatch(createBanner({ image: data.secure_url }));

      setImage(null);
    } catch (error) {}
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBanner(id));
    } catch (error) {}
  };

  return (
    <div className="brandPage">
      <form
        style={{
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          // gap: "10px",
        }}
        onSubmit={handleAddBrand}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            // gap: "10px",
            width: "100%",
          }}
        >
          <div className="addProductItem">
            <label>Ảnh</label>
            <input
              type="file"
              placeholder="Brand"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px 0px 8px 10px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={
                isLoadingAction === true || image === null ? true : false
              }
            >
              Thêm
            </Button>
          </div>
        </div>
        {image !== null && (
          <div style={{ width: "100%" }}>
            <img
              style={{ width: "90%", height: "350px", objectFit: "cover" }}
              src={URL.createObjectURL(image)}
              alt=""
            />
          </div>
        )}
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "1000px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>List banner</h1>
        <DataGrid
          rows={banner}
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

export default Banner;
