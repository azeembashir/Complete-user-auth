import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  ArrowBack,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { navigate } = useGeneral();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitHandler = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const result = await httpAction({
        url: apis().loginUser,
        method: "POST",
        body: values,
      });

      if (result?.success) {
        toast.success(result.message || "Login successful");
        resetForm();
        navigate("/"); // or /dashboard
      } else {
        console.log("invalid credentials");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
  };

  return (
    <div className="auth_card">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form autoComplete="off">
            <div className="container-fluid">
              <div className="row g-3">
                {/* Header */}
                <div className="col-12 auth_header">
                  <IoIosLogIn />
                  <p>Welcome Back</p>
                  <span>Login to Continue</span>
                </div>

                {/* Email */}
                <div className="col-12">
                  <TextField
                    name="email"
                    autoComplete="new-email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="Email"
                    fullWidth
                    size="small"
                  />
                </div>

                {/* Password */}
                <div className="col-12">
                  <TextField
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="Password"
                    fullWidth
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Login Button */}
                <div className="col-12">
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>

                <div className="col-12">
                  <Divider>OR</Divider>
                </div>

                {/* Google Login */}
                <div className="col-12">
                  <Button
                    onClick={loginWithGoogle}
                    variant="outlined"
                    fullWidth
                    endIcon={<Google />}
                  >
                    Continue with Google
                  </Button>
                </div>

                {/* Register */}
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/register")}
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowBack />}
                  >
                    Create New Account
                  </Button>
                </div>

                {/* Forget Password */}
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/password/forget")}
                    variant="text"
                    fullWidth
                    color="error"
                  >
                    Forgot password?
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
