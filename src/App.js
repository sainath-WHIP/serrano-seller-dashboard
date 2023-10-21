import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Store from "./redux/store";
import { getSellerInfo } from "./redux/actions/sellerAction";
import { Provider } from "react-redux";
import ShopCreate from "./pages/resgister";
import ShopLogin from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import ShopProfile from "./pages/profile";
import AddProduct from "./pages/Products/addProducts";
import ShopAllProducts from "./pages/Products";
import OrderDetails from "./pages/orders/order_id";
import { ChangePassword, ForgotPassword, ResetPassword } from "./pages/password";
import Orders from "./pages/orders";
import AllProducts from "./pages/Products/allProducts";

function App() {

  useEffect(() => {
    Store.dispatch(getSellerInfo());
  }, []);

  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShopLogin />} />
            <Route path="/shop-register" element={<ShopCreate />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:activation_token" element={<ResetPassword />} />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ShopAllProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/:product_id"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-products"
              element={
                <ProtectedRoute>
                  <AllProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="all-products/:product_id"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/:order_id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ShopProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
