import {TextField, Button} from "@mui/material";
import React from "react";
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
  return (
    <div className="auth_card">
      <div className="container-fluid">
        <div className="row g-3">
          <div className="col-12 auth_header">
            <IoIosLogIn />
            <p>Welcome Back</p>
            <span>Login to Continue</span>
          </div>
          <div className="col-12">
            <TextField label="Your email" fullWidth size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
