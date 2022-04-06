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
import { createProduct } from "../../redux/productRedux";
import "./newProduct.css";
import Select from "react-select";
import { getCategory } from "../../redux/categoryRedux";
import { getBrand } from "../../redux/brandRedux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function NewProduct() {
  const { isLoadingCreate } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { brand } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

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
      sale: sale,
      image: listImage,
      battery: battery,
      puffs: puffs,
    };
    try {
      const res = await dispatch(createProduct(value));
      if (res.meta.requestStatus === "fulfilled") {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: false, message: "Product create successful" });
        setName("");
        setDesc("");
        setCapacity("");
        setNicotine("");
        setPrice(0);
        setSale(0);
        setBattery("");
        setPuffs("");
        setListImage([
          {
            name: "",
            instock: true,
            image: "",
          },
        ]);
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
    const list = [...listImage];
    if (name === "image") {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "vape-store");
      try {
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/danh7181/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());

        list[index][name] = await data.secure_url;
        setListImage(list);
      } catch (error) {
        console.log(error);
      }
    } else {
      list[index][name] = value;
      setListImage(list);
    }
  };

  const [chonLoaiSanPham, setChonLoaiSanPham] = useState({
    value: "",
    label: "",
  });

  const handleChangeCategory = (newValue, actionMeta) => {
    setCategories(newValue.value);
    setChonLoaiSanPham({ value: newValue.value, label: newValue.label });
    setCapacity("");
    setNicotine("");
    setBattery("");
    setPuffs("");
  };

  const handleChangeBrand = (newValue, actionMeta) => {
    setBrands(newValue.value);
  };
  const handleChangeInstock = (newValue, actionMeta) => {
    setInstock(newValue.value);
  };

  return (
    <div className="newProduct">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingCreate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open}
        onClose={handleClose}
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
      <h1 className="addProductTitle">THÊM SẢN PHẨM MỚI</h1>
      <div className="addProductItem">
        <label>Loại sản phẩm</label>
        <Select
          options={categoryOption}
          onChange={handleChangeCategory}
          placeholder="Loại sản phẩm"
        />
      </div>
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
            <label>Thương hiệu</label>
            <Select
              options={brandOption}
              onChange={handleChangeBrand}
              placeholder="Thương hiệu"
            />
          </div>
          <div className="addProductItem">
            <label>Tình trạng</label>
            <Select
              options={inStockOption}
              onChange={handleChangeInstock}
              placeholder="Tình trạng"
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
              step="0.01"
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
          {(chonLoaiSanPham.label === "Juice Free Base" ||
            chonLoaiSanPham.label === "Juice Salt Nic") && (
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

          {chonLoaiSanPham.label === "Pod một lần" && (
            <>
              <div className="addProductItem">
                <label>Số hơi</label>
                <input
                  type="text"
                  placeholder="Số hơi"
                  value={puffs}
                  onChange={(e) => setPuffs(e.target.value)}
                />
              </div>
              <div className="addProductItem">
                <label>Battery</label>
                <input
                  type="text"
                  placeholder="Battery"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                />
              </div>
            </>
          )}

          {(chonLoaiSanPham.label === "Juice Free Base" ||
            chonLoaiSanPham.label === "Juice Salt Nic" ||
            chonLoaiSanPham.label === "Pod một lần") && (
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
        </div>
        <div className="item-2">
          <label>Mô tả sản phẩm</label>
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
                <div style={{ marginTop: "3px", marginLeft: "10px" }}>
                  <label
                    style={{
                      color: "gray",
                      fontWeight: "600",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Image
                  </label>
                  <input
                    required
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
                    style={{ marginLeft: "5px" }}
                  >
                    <span>Add Field Image</span>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
