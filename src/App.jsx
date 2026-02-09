import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductManagement from "./pages/ProductManagement";
import ViewProduct from "./pages/ViewProduct";
import UpdateInProduct from "./pages/UpdateInProduct";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" />} />

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
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
