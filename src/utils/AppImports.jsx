// AppImports.js

import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import SignInPage from "../pages/SignInPage";
import SignupPage from "../pages/SignupPage";
import Verification from "../pages/Verification";
import AdminNavbar from "../components/helpers/AdminNavbar";
import AdminPage from "../pages/admin/AdminPage";
import AdminCheck from "../private/AdminCheck";
import AdminAddCategory from "../pages/admin/AdminAddCategory";
import ProfilePage from "../pages/ProfilePage";
import AddProducts from "../pages/admin/AddProducts";
import ProductList from "../pages/ProductList";
import useRoleChecks from "../private/useRoleChecks";
import EditProducts from "../pages/admin/EditProducts";
import AgentCheck from "../private/AgentCheck";
import AgentProductPage from "../pages/agent/AgentProductPage";
import AgentNavbar from "../components/helpers/AgentNavbar";

export {
  React,
  Suspense,
  Routes,
  Route,
  useLocation,
  Navbar,
  HomePage,
  SingleProductPage,
  SignInPage,
  SignupPage,
  Verification,
  AdminNavbar,
  AdminPage,
  AdminCheck,
  AdminAddCategory,
  ProfilePage,
  AddProducts,
  ProductList,
  useRoleChecks,EditProducts,
  AgentCheck,AgentProductPage,AgentNavbar
};
