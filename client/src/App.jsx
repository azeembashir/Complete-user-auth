import React from 'react'
import './components/auth.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App