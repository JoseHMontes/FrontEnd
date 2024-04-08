// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard/Dashboard';
import Users from './Dashboard/Users';
import Home from './Dashboard/Home';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/dashboard/users' element={<Users/>}/>
        <Route path='/dashboard/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}
export default AppRouter;
