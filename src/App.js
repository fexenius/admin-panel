import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Users from "./pages/Users/Users";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Home from "./pages/Home/Home";

import Categories from "./pages/Categories/Categories";
import AddCategory from "./pages/Categories/AddCategory";

import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";

import Attributes from "./pages/Attributes/Attributes";
import AddAttribute from "./pages/Attributes/AddAttribute";

import Discounts from "./pages/Discounts/Disounts";
import AddDiscount from "./pages/Discounts/AddDiscount";

import Delivery from "./pages/Delivery/Delivery";
import AddDelivery from "./pages/Delivery/AddDelivery";

import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />

          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route path="/products/add" element={<AddProduct />} />
          <Route
            path="/attributes"
            element={
              <RequireAuth>
                <Attributes />
              </RequireAuth>
            }
          />
          <Route path="/attributes/add" element={<AddAttribute />} />
          <Route
            path="/discounts"
            element={
              <RequireAuth>
                <Discounts />
              </RequireAuth>
            }
          />
          <Route path="/discounts/add" element={<AddDiscount />} />

          <Route
            path="/delivery"
            element={
              <RequireAuth>
                <Delivery />
              </RequireAuth>
            }
          />
          <Route path="/delivery/add" element={<AddDelivery />} />

          <Route
            path="/categories"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route path="/categories/add" element={<AddCategory />} />

          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
