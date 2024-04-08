import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar';

function Dashboard() {
  return (
    <div className='Dash'>
      <NavBar />
    <Outlet /> 
    </div>
  );
}
export default Dashboard;

