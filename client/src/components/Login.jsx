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
import { ArrowBack, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const { navigate } = useGeneral();

  const visibleHandler = () => {
    setVisible(!visible);
  };

  const initialState = {
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

  const submitHandler = (values) => {
    console.log(values);
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5050/auth/google";
  }

  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 auth_header">
                  <IoIosLogIn />
                  <p>Welcome Back</p>
                  <span>Login to Continue</span>
                </div>
                <div className="col-12">
                  <TextField
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="Your email"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton edge="end" onClick={visibleHandler}>
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    name="password"
                    type={visible ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="Your password"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="contained" fullWidth>
                    Login
                  </Button>
                </div>

                <div className="col-12">
                  <Divider>OR</Divider>
                </div>

                <div className="col-12">
                  <Button onClick={loginWithGoogle} variant="outlined" fullWidth endIcon={<Google />}>
                    Google
                  </Button>
                </div>
                <div className="col-12">
                  <Button onClick={()=> navigate("/register")} variant="outlined" fullWidth startIcon={<ArrowBack />}>
                    Create New Account
                  </Button>
                </div>
                <div className="col-12">
                  <Button onClick={()=> navigate("/password/forget")} variant="text" fullWidth color="error">
                    forget password?
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
