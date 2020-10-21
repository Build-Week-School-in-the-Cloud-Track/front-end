import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("must be a valid email")
    .required("please provide email"),
  password: yup
    .string()
    .required("please enter a password")
    .min(5, "password is too short"),
});
