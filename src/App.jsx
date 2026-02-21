import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductManagement from "./pages/ProductManagement";
import ViewProduct from "./pages/ViewProduct";
import UpdateInProduct from "./pages/UpdateInProduct";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Blog from "./pages/Blog";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
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
        path="/product-management"
        element={
          <ProtectedRoute>
            <ProductManagement />
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
        path="/order-detail/:orderId"
        element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/view/:id"
        element={
          <ProtectedRoute>
            <ViewProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/update/:id"
        element={
          <ProtectedRoute>
            <UpdateInProduct />
          </ProtectedRoute>
        }
      />

       
      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />
        
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Default redirect - MUST BE LAST */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
