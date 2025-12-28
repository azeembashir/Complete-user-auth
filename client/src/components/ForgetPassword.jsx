import { FaArrowRotateRight } from "react-icons/fa6";
import { TextField, Button } from "@mui/material";
import React from "react";

import * as yup from "yup";
import { Form, Formik } from "formik";
import { ArrowBack, ChairAltTwoTone } from "@mui/icons-material";
import { IoMdSend } from "react-icons/io";
import useGeneral from "../hooks/useGeneral";

const ForgetPassword = () => {

  const { navigate } = useGeneral();


  const initialState = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const submitHandler = (values) => {
    console.log(values);
    navigate("/otp/verify");
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
                  <FaArrowRotateRight />

                  <p>Find Your Account</p>
                  <span>Enter Your Registered Email</span>
                </div>

                <div className="col-12">
                  <TextField
                    
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="registered email"
                    fullWidth
                    size="small"
                  />
                </div>

                <div className="col-12">
                  <Button
                    endIcon={<IoMdSend />}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Send OTP
                  </Button>
                </div>

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

export default ForgetPassword;
