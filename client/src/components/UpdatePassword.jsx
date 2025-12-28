import React, { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { GrUpdate } from "react-icons/gr";
import {
  ArrowBack,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";

const UpdatePassword = () => {
  const [visible, setVisible] = useState(false);
  const { navigate } = useGeneral();

  const visibleHandler = () => {
    setVisible(!visible);
  };

  const initialState = {
    password: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitHandler = (values) => {
    console.log(values);
    navigate("/profile")
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
                  <GrUpdate />
                  <p>Update Password</p>
                  <span>Create a new password</span>
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
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="New password"
                    fullWidth
                    size="small"
                  />
                </div>

                <div className="col-12">
                  <Button type="submit" variant="contained" fullWidth>
                    Update Password
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;
