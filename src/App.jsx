// App.js
import {
  Navbar,SingleProductPage,SignInPage,SignupPage,Verification,AdminNavbar,AdminPage,
  AdminCheck,AdminAddCategory,ProfilePage,AddProducts,useRoleChecks,EditProducts,
  AgentCheck,AgentProductPage,AgentNavbar,
  ProductList,
} from "./utils/AppImports";

import { React, Routes, Route ,Suspense} from "./utils/AppImports";
import { useSelector } from "react-redux";
import axios from "axios";
import SharedProductPage from "./pages/SharedProductPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/shared/ResetPassword";
import ShoppingCart from "./pages/ShoppingCart";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import MyOrders from "./pages/MyordersPage";
import LoaderPage from "./components/helpers/LoaderPage";
import OtpForm from "./components/shared/OtpForm";
import ScrollToTop from "./utils/ScrollToTop";
import AgentUsersPage from "./pages/agent/AgentUsersPage";
import UserDetailsPage from "./pages/agent/UserDetailsPage";
import OrderListPage from "./pages/admin/OrderListPage";
import ViewFullOrder from "./pages/admin/ViewFullOrder";
import UserInfoPage from "./pages/admin/UserInfoPage";
import AddedUsers from "./pages/admin/AddedUsers";
import MyAgents from "./pages/admin/MyAgents.";
import ShippedOrders from "./pages/admin/ShippedOrders";
import DetailedPage from "./pages/DetailedPage";



axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;
const HomePage = React.lazy(() => import('./pages/HomePage'));

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isAdminRoute, isAgentRoute } = useRoleChecks();

  return (
    <>
    <ScrollToTop/>
      {isAdminRoute() ? ( <AdminNavbar />) : isAgentRoute() ? (<AgentNavbar />
      ) : ( <Navbar /> )}
        <Suspense fallback={<LoaderPage/>}>
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
        <Route path="/admin-all-orders" element={<AdminCheck />}>
          <Route index element={<OrderListPage/>} />
        </Route>
        <Route path="/admin-shipped-orders" element={<AdminCheck />}>
          <Route index element={<ShippedOrders/>} />
        </Route>
        <Route path="/admin-view-order" element={<AdminCheck />}>
          <Route index element={<ViewFullOrder/>} />
        </Route>
        <Route path="/admin-user-details" element={<AdminCheck />}>
          <Route index element={<UserInfoPage/>} />
        </Route>
        <Route path="/admin-added-user" element={<AdminCheck />}>
          <Route index element={<AddedUsers/>} />
        </Route>
        <Route path="/admin-my-agents" element={<AdminCheck />}>
          <Route index element={<MyAgents/>} />
        </Route>
        <Route
          path="/agent-add-users"
          element={<AgentCheck userId={currentUser?._id} />}
        >
          <Route index element={<AgentProductPage />} />
        </Route>
        <Route
          path="/agent-users"
          element={<AgentCheck userId={currentUser?._id} />}
        >
          <Route index element={<AgentUsersPage/>} />
        </Route>
        <Route
          path="/agent-user-details"
          element={<AgentCheck userId={currentUser?._id} />}
        >
          <Route index element={<UserDetailsPage/>} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/verify-email/:id" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/products-details" element={<DetailedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/shared-product/:productId/:agentId" element={<SharedProductPage/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
        <Route path="/place-order" element={<PlaceOrderPage/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/otp-verify" element={<OtpForm/>} />
      </Routes>
      </Suspense>
    </>
  );
};

export default App;
