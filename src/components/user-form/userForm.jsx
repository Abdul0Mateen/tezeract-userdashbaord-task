import { useFormik } from "formik";
import Dropdown from "../../common-components/dropdown/dropdown";
import InputField from "../../common-components/input-field/inputField";
import RadioButton from "../../common-components/radio-button/radiobutton";
import ToggleButton from "../../common-components/toggle-button/toggleButton";
import "./userForm.css";
import { userFormSchema } from "../../form-schema/userFormSchema";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../features/userDataSlice.jsx";
import { Loader } from "../../common-components/loader/loader.jsx";
import { SuccessModal } from "../../common-components/success-modal/successModal.jsx";

const UserForm = () => {
  const dispatch = useDispatch();
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const [previewImg, setPreviewImg] = useState("");
  const [loaderShow, setLoaderShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const initialValues = {
    userImg: "",
    userImgSrc: "",
    userName: "",
    email: "",
    phoneNumber: "",
    country: "",
    countryState: "",
    userStatus: false,
    userRole: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: userFormSchema,
    onSubmit: (values, { resetForm }) => {
      setLoaderShow(true);
      dispatch(addNewUser(values));
      setLoaderShow(false);
      setModalShow(true);
      setTimeout(
        function () {
          setModalShow(false);
          resetForm();
          setPreviewImg("");
        },
        [1000]
      );
    },
  });
  const handleImageUpload = async (cloudImg) => {
    setLoaderShow(true);
    const formData = new FormData();
    formData.append("file", cloudImg);
    formData.append("upload_preset", cloudinaryUploadPreset);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setFieldValue("userImgSrc", data.url);
      setPreviewImg(data.url);
      setLoaderShow(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleInputImage = (event) => {
    const selectedImage = event.currentTarget.files[0];
    handleImageUpload(selectedImage);
    setFieldValue("userImg", event.target.value);
  };

  return (
    <div className="userFormContainer">
      {loaderShow && <Loader />}
      {modalShow && <SuccessModal />}
      <div className="userFormHeading">
        <h1>User Form</h1>
      </div>
      <div className="userFormInputWrapper">
        <div className="userFormUploadWrapper">
          <div className="userFormUploadInner">
            <div className="userFormImgUpload">
              <label>
                + Browse
                <input
                  type="file"
                  name="userImg"
                  accept=".png, .jpeg, .jpg"
                  value={values.userImg}
                  onChange={(event) => handleInputImage(event)}
                  onBlur={handleBlur}
                />
              </label>
            </div>
            {previewImg && (
              <div className="previewUploadedImg">
                <img src={previewImg} alt="" />
              </div>
            )}
          </div>
          <p className="uploadImgType">PNG, JPEG, JPG</p>
          {touched.userImg && errors.userImg && (
            <p className="imgErrorMessage">{errors.userImg}</p>
          )}
        </div>
        <div className="userFormInput">
          <InputField
            inputlabel="User Name"
            placeholder="Enter username"
            type="text"
            name="userName"
            errorMessage={touched.userName && errors.userName}
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="userFormInput">
          <InputField
            inputlabel="Email"
            placeholder="Enter email"
            type="email"
            name="email"
            errorMessage={touched.email && errors.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="userFormInput">
          <InputField
            inputlabel="Phone Number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            errorMessage={touched.phoneNumber && errors.phoneNumber}
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="userFormInput">
          <Dropdown
            menuLabel="Country"
            onChange={(country) =>
              handleChange({
                target: { name: "country", value: country },
              })
            }
            errorMessage={touched.country && errors.country}
          >
            <option value="lorem1">Select Country</option>
            <option value="lorem1">lorem1</option>
            <option value="lorem2">lorem2</option>
            <option value="lorem3">lorem3</option>
            <option value="lorem4">lorem4</option>
            <option value="lorem5">lorem5</option>
          </Dropdown>
        </div>
        <div className="userFormInput">
          <Dropdown
            menuLabel="State"
            onChange={(countryState) =>
              handleChange({
                target: { name: "countryState", value: countryState },
              })
            }
            errorMessage={touched.countryState && errors.countryState}
          >
            <option value="lorem1">Select State</option>
            <option value="lorem2">lorem2</option>
            <option value="lorem3">lorem3</option>
            <option value="lorem4">lorem4</option>
            <option value="lorem5">lorem5</option>
          </Dropdown>
        </div>
        <div className="userFormToggle">
          <ToggleButton
            toggleLabel="Select Your Role (optional)"
            value={values.userStatus}
            onChange={handleChange}
            name="userStatus"
          />
        </div>
        <div className="userFormRadio">
          <RadioButton
            radioLabel="Student"
            name="userRole"
            value="Student"
            onChange={handleChange}
          />
          <RadioButton
            radioLabel="Teacher"
            name="userRole"
            value="Teacher"
            onChange={handleChange}
          />
          <RadioButton
            radioLabel="Other"
            name="userRole"
            value="Other"
            onChange={handleChange}
          />
        </div>
        <div className="userFormAdd">
          <button type="button" onClick={handleSubmit}>
            ADD USER
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
