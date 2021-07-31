import React, { Component, useState } from 'react';
import classes from './App.css';
import Layout from '../Component/Layout/Layout';
import Registration from './Student/Registration/Registration';
import { Route, Redirect } from 'react-router-dom';
import Health from './Student/Health/Health';
import StudentList from './Student/StudentList/StudentList';
import Cloth from './Student/Cloth/Cloth';
import StoreList from './Store/StoreComponents/StoreList/SubProductList/SubProductList';
import CreateProduct from './Store/StoreComponents/StoreForm/CreateProduct/CreateProduct';
import CreateSubProduct from './Store/StoreComponents/StoreForm/CreateSubProduct/CreateSubProduct';
import Cart from './Store/StoreComponents/Cart/Cart';
import Products from './Store/Products/Products';
import StudentProfile from './Student/StudentProfile/StudentProfile';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import axiosInstance from '../Helper/axiosInstance';
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  const [auth, setAuth] = useState(false);
  if (localStorage.getItem('token')) {
    if (!auth) {
      axiosInstance().get('/auth/valid').then(res => {
        setAuth(res.data.valid);
      }).catch((err) => {
        console.log(err)
        setAuth(false);
      })
    }
  }
  const truee = () => {
    setAuth(true);
  }
  const druee = () => {
    setAuth(false);
  }

  return (
    <div className={classes.App} >
      <Layout druee={druee} auth={auth} >
        <div className={classes.DisplayContant}>
          <Route path="/home" component={Dashboard} />
          <Route path="/student/studentlist/:id" render={() => <Registration />} />
          <Route path="/student/health" component={Health} />
          <Route path="/student/profile" component={StudentProfile} />
          <Route path="/student/cloth" component={Cloth} />
          <Route path="/student/editStudent" component={StudentList} />
          <Route path="/student/addStudent" component={Registration} />
          <Route path="/store/createProduct" component={CreateProduct} />
          <Route path="/store/createSubProduct" component={CreateSubProduct} />
          <Route path="/store/storeList" component={StoreList} />
          <Route path="/store/cart" component={Cart} />
          <Route path="/store/products" component={Products} />
          <Route path="/login" render={() => <Login redi={truee} />} />
          <Route path="/signup" render={() => <Signup redi={truee} />} />
        </div>
      </Layout>

    </div >


  );


}

export default App;
