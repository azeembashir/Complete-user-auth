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
import { Form, Formik } from "formik";
import {
  ArrowBack,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Register = () => {
  const [visible, setVisible] = useState(false);

  const visibleHandler = () => {
    setVisible(!visible);
  };
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
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
                  <IoMdPersonAdd />

                  <p>Create New Account</p>
                  <span>Signup to Continue</span>
                </div>
                <div className="col-12">
                  <TextField
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    label="Your name"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <TextField
                    name="email"
                    type="email"
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
                    label="Create New password"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="contained" fullWidth>
                    Signup
                  </Button>
                </div>

                <div className="col-12">
                  <Divider>OR</Divider>
                </div>

                <div className="col-12">
                  <Button variant="outlined" fullWidth endIcon={<Google />}>
                    Continue With Google
                  </Button>
                </div>
                <div className="col-12">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowBack />}
                  >
                    Back to Login
                  </Button>
                </div>
                {/* <div className="col-12">
                  <Button variant="text" fullWidth color="error">
                    forget password?
                  </Button>
                </div> */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
