import React from 'react'
import './components/auth.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
    </Routes>
  )
}

export default App