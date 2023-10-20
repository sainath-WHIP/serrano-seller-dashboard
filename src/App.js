import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Store from "./redux/store";
import { getSellerInfo } from "./redux/actions/sellerAction";
import { Provider } from "react-redux";
import ShopCreate from "./pages/shopRegister";
import ShopLogin from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import ShopProfile from "./pages/ShopProfile";
import AddProduct from "./pages/addProducts";
import Products from "./pages/Products";
import ProductDetails from "./pages/Products/product_id";
import OrderDetails from "./pages/orders/order_id";
import { ChangePassword, ForgotPassword, ResetPassword } from "./pages/password";
import Orders from "./pages/orders";

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
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/:product_id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
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
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
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
