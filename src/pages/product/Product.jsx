import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Slide,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/productRedux";
import "./product.css";
import Select from "react-select";
import { getCategory } from "../../redux/categoryRedux";
import { getBrand } from "../../redux/brandRedux";
import { getProductDetail } from "../../redux/productRedux";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function Product() {
  const { isLoadingUpdate } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { brand } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [nicotine, setNicotine] = useState("");
  const [instock, setInstock] = useState(true);
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [battery, setBattery] = useState("");
  const [puffs, setPuffs] = useState("");
  const [listImage, setListImage] = useState([
    {
      name: "",
      instock: true,
      image: "",
    },
  ]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await dispatch(getCategory());
      } catch (error) {}
    };

    const fetchBrand = async () => {
      try {
        await dispatch(getBrand());
      } catch (error) {}
    };
    fetchBrand();
    fetchCategory();
  }, [dispatch]);

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      const res = await dispatch(getProductDetail(id));
      setName(res.payload.name);
      setDesc(res.payload.desc);
      setCapacity(res.payload.capacity);
      setNicotine(res.payload.nicotine);
      setPrice(res.payload.price);
      setSale(res.payload.sale);
      setListImage(res.payload.image);
      setCategories(res.payload.category._id);
      setBrands(res.payload.brand._id);
      setInstock(res.payload.instock);
      setBattery(res.payload.battery);
      setPuffs(res.payload.puffs);
    };
    fetchProductDetail(id);
  }, [dispatch, id]);

  const categoryOption = category.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const brandOption = brand.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const inStockOption = [
    { value: true, label: "Còn hàng" },
    { value: false, label: "Hết hàng" },
  ];
  const handleCreate = async (e) => {
    e.preventDefault();
    const value = {
      name: name,
      category: categories,
      brand: brands,
      desc: desc,
      capacity: capacity,
      nicotine: nicotine,
      instock: instock,
      price: price,
      image: listImage,
      battery: battery,
      puffs: puffs,
      sale: sale,
    };
    try {
      const res = await dispatch(updateProduct({ id: id, data: value }));
      if (res.meta.requestStatus === "fulfilled") {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: false, message: "Product create successful" });
      } else if (res.meta.requestStatus === "rejected") {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: true, message: "Product create failed" });
      }
    } catch (error) {}
  };

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
  const handleFieldAdd = () => {
    setListImage([
      ...listImage,
      {
        name: "",
        instock: true,
        image: "",
      },
    ]);
  };
  const handleRemoveField = (index) => {
    const list = [...listImage];
    list.splice(index, 1);
    setListImage(list);
  };

  const handleListImageChange = async (e, index) => {
    const { name, value, files } = e.target;
    try {
      const list = await [...listImage];
      if (name === "image") {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "vape-store");

        const data = await fetch(
          "https://api.cloudinary.com/v1_1/danh7181/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
        setListImage(
          list.map((item, i) =>
            index === i ? { ...item, image: data.secure_url } : item
          )
        );
      } else {
        setListImage(
          list.map((item, i) =>
            index === i ? { ...item, [name]: value } : item
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategory = (newValue, actionMeta) => {
    setCategories(newValue.value);
  };
  const handleChangeBrand = (newValue, actionMeta) => {
    setBrands(newValue.value);
  };
  const handleChangeInstock = (newValue, actionMeta) => {
    setInstock(newValue.value);
  };

  return (
    <div className="product">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={transition ? transition.name : ""}
      >
        <Alert
          onClose={handleClose}
          severity={notify.isValid ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
      <h1 className="addProductTitle">CẬP NHẬT THÔNG TIN SẢN PHẨM</h1>
      <form className="addProductForm" onSubmit={handleCreate}>
        <div className="item-1">
          <div className="addProductItem">
            <label>Tên sản phẩm</label>
            <input
              required
              type="text"
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="addProductItem">
            <label style={{ display: "flex" }}>
              Loại sản phẩm{" "}
              <p style={{ marginLeft: "5px" }}>
                (
                {
                  categoryOption?.find((item) => item.value === categories)
                    ?.label
                }
                )
              </p>
            </label>
            <Select
              options={categoryOption}
              onChange={handleChangeCategory}
              placeholder="Loại sản phẩm"
              isDisabled
            />
          </div>
          <div className="addProductItem">
            <label style={{ display: "flex" }}>
              Thương hiệu{" "}
              <p style={{ marginLeft: "5px" }}>
                ({brandOption?.find((item) => item.value === brands)?.label})
              </p>
            </label>
            <Select
              options={brandOption}
              onChange={handleChangeBrand}
              placeholder="Thương hiệu"
              defaultValue={brands}
            />
          </div>
          {capacity !== "" && (
            <div className="addProductItem">
              <label>Dung tích</label>
              <input
                type="text"
                placeholder="dung tích"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          )}
          {battery !== "" && (
            <div className="addProductItem">
              <label>Battery</label>
              <input
                type="text"
                placeholder="Battery"
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
              />
            </div>
          )}
          {puffs !== "" && (
            <div className="addProductItem">
              <label>Số hơi</label>
              <input
                type="text"
                placeholder="Số hơi"
                value={puffs}
                onChange={(e) => setPuffs(e.target.value)}
              />
            </div>
          )}

          {nicotine !== "" && (
            <div className="addProductItem">
              <label>Nicotine</label>
              <input
                type="text"
                placeholder="Nicotine"
                value={nicotine}
                onChange={(e) => setNicotine(e.target.value)}
              />
            </div>
          )}
          <div className="addProductItem">
            <label>Tình trạng</label>
            <Select
              options={inStockOption}
              onChange={handleChangeInstock}
              placeholder="Tình trạng"
              defaultValue={inStockOption.find(
                (item) => item.value === instock
              )}
            />
          </div>

          <div className="addProductItem">
            <label>Giá</label>
            <input
              required
              type="number"
              placeholder="Giá"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Giảm giá</label>
            <input
              type="number"
              placeholder="Giá giảm"
              value={sale}
              onChange={(e) => setSale(e.target.value)}
            />
          </div>
        </div>
        <div className="item-2">
          <label>Mô tả sản phẩm</label>
          {/* <textarea
            placeholder="Mô tả sản phẩm"
            name=""
            id=""
            cols="100"
            rows="10"
            value={desc}
            // style={{ width: "100%" }}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea> */}
          <CKEditor
            editor={ClassicEditor}
            data={desc}
            config={{
              removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDesc(data);
            }}
          />
        </div>
        <div className="item-3">
          {listImage.map((item, index) => (
            <div key={index}>
              <div className="item-3-wrapper">
                <div>
                  <div className="addProductItem">
                    <label>Tên hình</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Tên hình"
                      value={item.name}
                      onChange={(e) => handleListImageChange(e, index)}
                    />
                  </div>
                  <div className="addProductItem">
                    <label>tình trạng hình</label>
                    <input
                      required
                      name="instock"
                      type="text"
                      placeholder="tình trạng hình"
                      value={item.instock}
                      onChange={(e) => handleListImageChange(e, index)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      color: "gray",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleListImageChange(e, index)}
                  />
                  <div className="displayImg" style={{ marginTop: "10px" }}>
                    {item.image && <img src={item.image} alt="" />}
                  </div>
                </div>
                {listImage.length !== 1 && (
                  <div>
                    <Button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="add-btn"
                      variant="outlined"
                      color="error"
                    >
                      <span>Remove</span>
                    </Button>
                  </div>
                )}
              </div>
              {listImage.length - 1 === index && (
                <div>
                  <Button
                    type="button"
                    onClick={handleFieldAdd}
                    className="add-btn"
                    variant="outlined"
                    color="info"
                  >
                    <span>Add Field Image</span>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="addProductButton">Update</button>
      </form>
    </div>
  );
}
