import * as Yup from "yup";
export const userFormSchema = Yup.object().shape({
  userImg: Yup.string().required("Required*"),
  userName: Yup.string().required("Required*"),
  email: Yup.string().email().required("Required*"),
  country: Yup.string().required("Required"),
  countryState: Yup.string().required("Required"),
  phoneNumber: Yup.number()
    .required("Required*")
    .min(1000000000, "Please enter a valid number")
    .max(9999999999, "Please enter a valid number"),
});
