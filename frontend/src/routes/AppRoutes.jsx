import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import NotFound from "../pages/NotFound"
import { CartPage } from "../features/cart"
import { LoginPage, RegisterPage, ForgotPasswordPage } from "../features/auth"
import MainLayout from "../layouts/MainLayout"
import ProductDetail from "../features/product/pages/ProductDetail"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
