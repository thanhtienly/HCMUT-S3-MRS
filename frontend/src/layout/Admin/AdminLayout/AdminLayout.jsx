import React from 'react';
import AdminMenu from '../../../components/AdminComponent/Menu/AdminMenu';
import { Outlet } from 'react-router-dom';
import AdminFooter from '../../../components/AdminComponent/Footer/AdminFooter';
import Navbar from '../../../components/AdminComponent/Navbar';
import "../styles/admin.scss";


const AdminLayout = () => {
  return (
    <div className='mainAdmin'>
      <Navbar />
      <div className='mainAdminContainer'>
        <div className='menuAdminContainter'>
          <AdminMenu />
        </div>
        <div className='contentAdminContainer'>
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
