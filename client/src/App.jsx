import React from 'react'
import './components/auth.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import OtpVerification from './components/OtpVerification';
import UpdatePassword from './components/UpdatePassword';
import Profile from './components/Profile';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/password/forget' element={<ForgetPassword />} />
      <Route path='/otp/verify' element={<OtpVerification />} />
      <Route path='/password/update' element={<UpdatePassword />} />
      <Route path='/' element={<Profile />} />
    </Routes>
  )
}

export default App