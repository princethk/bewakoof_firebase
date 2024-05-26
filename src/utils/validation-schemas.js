import * as Yup from "yup";

/**
 * Validation schema for user signup form.
 *
 * @type {Yup.ObjectSchema}
 */
export const signupValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter the password"),
});

/**
 * Validation schema for user login form.
 *
 * @type {Yup.ObjectSchema}
 */
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

/**
 * Validation schema for order form.
 *
 * @type {Yup.ObjectSchema}
 */
export const orderFormValidationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postcode: Yup.string().required("Postcode is required"),
});
