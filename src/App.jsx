// App.js
import {
  Navbar, HomePage,SingleProductPage,SignInPage,SignupPage,Verification,AdminNavbar,AdminPage,
  AdminCheck,AdminAddCategory,ProfilePage,AddProducts,useRoleChecks,EditProducts,
  AgentCheck,AgentProductPage,AgentNavbar,
  ProductList,
} from "./utils/AppImports";

import { React, Routes, Route } from "./utils/AppImports";
import { useSelector } from "react-redux";
import axios from "axios";
import SharedProductPage from "./pages/SharedProductPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/shared/ResetPassword";
import ShoppingCart from "./pages/ShoppingCart";
import PlaceOrderPage from "./pages/PlaceOrderPage";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isAdminRoute, isAgentRoute } = useRoleChecks();

  return (
    <>
      {isAdminRoute() ? ( <AdminNavbar />) : isAgentRoute() ? (<AgentNavbar />
      ) : ( <Navbar /> )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminCheck />}>
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="/admin-add-category" element={<AdminCheck />}>
          <Route index element={<AdminAddCategory />} />
        </Route>
        <Route path="/admin-add-products" element={<AdminCheck />}>
          <Route index element={<AddProducts />} />
        </Route>
        <Route path="/admin-all-products" element={<AdminCheck />}>
          <Route index element={<ProductList />} />
        </Route>
        <Route path="/admin-edit-products/:id" element={<AdminCheck />}>
          <Route index element={<EditProducts />} />
        </Route>
        <Route
          path="/agent-main"
          element={<AgentCheck userId={currentUser?._id} />}
        >
          <Route index element={<AgentProductPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/verify-email/:id" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/shared-product/:productId/:agentId" element={<SharedProductPage/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
        <Route path="/place-order" element={<PlaceOrderPage/>} />
      </Routes>
    </>
  );
};

export default App;
