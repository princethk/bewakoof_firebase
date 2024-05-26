import { Button, Input } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/password-input";
import { auth } from "../config/firebase.config";
import useAuth from "../hooks/use-auth";
import { signupValidationSchema } from "../utils/validation-schemas";

/**
 * Signup component for user registration.
 *
 * @component
 * @returns {JSX.Element} The rendered Signup component.
 */
export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        setIsLoading(true);
        formik.setErrors({});
        await createUserWithEmailAndPassword(auth, email, password);
        login(email, password);
        navigate("/");
      } catch (error) {
        toast.error("Account creation failed", { id: "error-toast" });
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: signupValidationSchema,
  });

  return (
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full sm:max-w-md p-4 sm:p-8 flex flex-col gap-8">
        <form
          className="flex flex-col gap-4 shadow-2xl p-6 rounded-md light:bg-gray-100"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-center gap-2 tracking-wide font-bold text-2xl">
            <span>Signup</span>
          </div>
          {error && (
            <div
              className="bg-red-500 bg-opacity-10 border border-red-400 p-2 rounded-lg relative"
              role="alert"
            >
              <span className="block sm:inline">
                {error ? error : "No response from server"}
              </span>
            </div>
          )}
          <Input
            label="Email"
            variant="underlined"
            color="primary"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            errorMessage={formik.submitCount > 0 && formik.errors.email}
            isInvalid={formik.submitCount > 0 && !!formik.errors.email}
            placeholder="johndoe@gmail.com"
          />
          <PasswordInput
            label={"Password"}
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            isInvalid={formik.submitCount > 0 && !!formik.errors.password}
            errorMessage={formik.submitCount > 0 && formik.errors.password}
          />
          <PasswordInput
            label={"Confirm Password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            isInvalid={
              formik.submitCount > 0 && !!formik.errors.confirmPassword
            }
            errorMessage={
              formik.submitCount > 0 && formik.errors.confirmPassword
            }
          />
          <Button
            variant="solid"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={formik.handleSubmit}
            className="bg-[#fb641b] text-white rounded-sm"
          >
            Signup
          </Button>
          <div className="text-sm text-center p-2 rounded-lg">
            Existing User?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
