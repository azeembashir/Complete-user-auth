import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { ArrowBack, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import { toast } from "react-hot-toast";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { navigate } = useGeneral();

  const toggleVisibility = () => setVisible(!visible);

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const submitHandler = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const data = {
        url: apis().registerUser,
        method: "POST",
        body: values,
      };

      const result = await httpAction(data);

      if (result?.success) {
        toast.success(result.message || "Registered successfully!");
        resetForm();
      } else {
        toast.error(result?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
  window.location.href = "http://localhost:5050/auth/google";
};

  return (
    <div className="auth_card">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 auth_header">
                  <IoMdPersonAdd />
                  <p>Create New Account</p>
                  <span>Signup to Continue</span>
                </div>

                {/* Name */}
                <div className="col-12">
                  <TextField
                    name="name"
                    autoComplete="new-name"
                    label="Your name"
                    fullWidth
                    size="small"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </div>

                {/* Email */}
                <div className="col-12">
                  <TextField
                    name="email"
                    autoComplete="new-email"
                    label="Your email"
                    type="email"
                    fullWidth
                    size="small"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>

                {/* Password */}
                <div className="col-12">
                  <TextField
                    name="password"
                    autoComplete="new-password"
                    label="Create New Password"
                    type={visible ? "text" : "password"}
                    fullWidth
                    size="small"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleVisibility}>
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Submit */}
                <div className="col-12">
                  <Button type="submit" variant="contained" fullWidth disabled={loading}>
                    {loading ? "Signing Up..." : "Signup"}
                  </Button>
                </div>

                <div className="col-12">
                  <Divider>OR</Divider>
                </div>

                {/* Google login */}
                <div className="col-12">
                  <Button variant="outlined" fullWidth endIcon={<Google />} onClick={googleLogin}>
                    Continue With Google
                  </Button>
                </div>

                {/* Back to login */}
                <div className="col-12">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowBack />}
                  >
                    Back to Login
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

export default Register;
