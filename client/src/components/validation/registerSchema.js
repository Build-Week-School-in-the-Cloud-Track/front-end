import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required to register"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Must be at least five characters"),
  name: yup
    .string()
    .required("Name is Required")
    .min(3, "Must be at least three characters"),
  role: yup
    .string()
    .oneOf(["1", "2", "3"], "Please select student, admin, or volunteer")
    .required("Selection required"),
  country: yup.string(),
});
