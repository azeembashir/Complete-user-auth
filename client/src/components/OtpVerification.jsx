import React from "react";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import Countdown from "react-countdown";
import useGeneral from "../hooks/useGeneral";

const OtpVerification = () => {
  const { navigate } = useGeneral();
  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const validationSchema = yup.object({
    otp1: yup.number().required(""),
    otp2: yup.number().required(""),
    otp3: yup.number().required(""),
    otp4: yup.number().required(""),
    otp5: yup.number().required(""),
    otp6: yup.number().required(""),
  });

  const submitHandler = (values) => {
    console.log(values);
    navigate("/password/update");
  };

  const otpArray = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

  const inputChange = (value, setFieldValue, item, index) => {
    setFieldValue(item, value);
    if (value && index > 0 && index < 6) {
      const element = document.getElementById(index + 1);
      element.focus();
    }
  };
  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 auth_header">
                  <MdOutlineVerifiedUser />
                  <p>Verify OTP</p>
                  <span>Enter the 6-digit code sent to your email</span>
                </div>
                <div className="col-12 otp_inputs">
                  {otpArray.map((item, index) => (
                    <TextField
                      key={index}
                      value={values[item]}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        inputChange(value, setFieldValue, item, index + 1);
                      }}
                      inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                      id={index + 1}
                      size="small"
                      fullWidth
                      type="text"
                      name={item[index + 1]}
                      onBlur={handleBlur}
                      error={touched[item] && Boolean(errors[item])}
                    />
                  ))}
                </div>
                <div className="col-12">
                  <Button
                    disabled={Object.values(values).some(
                      (value) => value === ""
                    )}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Verify OTP
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
                <Countdown  
                  
                  renderer={({ minutes, seconds, completed }) => {
                    if (completed) {
                      return <div>
                        <Button variant="text">Resend OTP</Button>
                      </div>
                    } else {
                      return (<span>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                      );
                    }
                  }}
                  date={new Date(Date.now() + 1 * 60 * 1000)}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerification;
