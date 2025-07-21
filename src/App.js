import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import ShoppingCartPage from "./pages/ShoppingCart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderedHistoryPage";
import BestsellersPage from "./pages/BestSellerPage";
import PromotionsPage from "./pages/PromotionPage";
import WishlistPage from "./pages/BookmarksPage";
import NotificationPage from "./pages/NotificationPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookdetail/:id" element={<BookDetailPage />} />
        <Route path="/shoppingcart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderedhistory" element={<OrderHistoryPage />} />
        <Route path="/bestsellers" element={<BestsellersPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        {/* nav in header: /wishlist - bookmarks, /notification,  */}
      </Routes>
    </Router>
  );
};

export default App;