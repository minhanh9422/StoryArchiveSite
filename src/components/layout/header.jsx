import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Bell,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Star,
  Sparkles,
  Gift,
  Package,
  HelpCircle,
} from "lucide-react"
import { getUserInfo } from "../../services/api";

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [userData, setUserData] = useState(null)
  const isLoggedIn = !!userData?.user

  useEffect(() => {
    getUserInfo()
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err))
  }, [])
    const categories = [
    { name: "Văn học", icon: "📖", path: "/category/van-hoc", color: "text-blue-600" },
    { name: "Kinh tế", icon: "💼", path: "/category/kinh-te", color: "text-green-600" },
    { name: "Khoa học", icon: "🔬", path: "/category/khoa-hoc", color: "text-purple-600" },
    { name: "Lịch sử", icon: "🏛️", path: "/category/lich-su", color: "text-amber-600" },
    { name: "Tâm lý", icon: "🧠", path: "/category/tam-ly", color: "text-pink-600" },
    { name: "Thiếu nhi", icon: "🧸", path: "/category/thieu-nhi", color: "text-orange-600" },
  ]
  const cartCount = userData?.cartCount || 0
  return (
    <header
      className="bg-white shadow-lg sticky top-0 z-50"
      style={{ borderBottom: "2px solid transparent", borderImage: "linear-gradient(90deg, #667eea, #764ba2) 1" }}
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              📞 <span className="text-purple-600 font-medium">1900-1234</span>
            </span>
            <span className="flex items-center gap-1">
              ✉️ <span className="text-purple-600 font-medium">support@storyarchive.com</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-600">
            <Link to="/orderedhistory" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <Package className="w-4 h-4" />
              Tra cứu đơn hàng
            </Link>
            <Link to="/help" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Trợ giúp
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <img src="/logo512.png" alt="logo" className="h-8 w-8 rounded-lg" />
            </div>
            <span className="text-2xl font-bold gradient-text">Story Archive</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả, thể loại..."
                className="w-full pl-12 pr-20 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-6 py-1.5 rounded-full hover:shadow-lg transition-all btn-gradient">
                Tìm
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop icons */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notifications */}
              <Link to="/notification" className="relative">
                <Bell className="h-6 w-6 text-gray-700 hover:text-purple-600 cursor-pointer transition-colors" />
                <span
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center pulse"
                  style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
                >
                  {userData?.notifications || 0}
                </span>
              </Link>

              {/* Bookmarks */}
              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6 text-gray-700 hover:text-pink-600 cursor-pointer transition-colors" />
                <span
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)" }}
                >
                  {userData?.bookmarks || 0}
                </span>
              </Link>

              {/* Cart */}
              <Link to="/shoppingcart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-purple-600 cursor-pointer transition-colors" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center bounce"
                    style={{ background: "linear-gradient(135deg, #667eea 0%, #3b82f6 100%)" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {isLoggedIn ? (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:shadow-md transition-all cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Xin chào, {userData?.user?.full_name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                >
                  <BookOpen className="w-4 h-4" />
                  Danh mục sách
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryMenu ? "rotate-180" : ""}`} />
                </button>

                {showCategoryMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-2">
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            to={category.path}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setShowCategoryMenu(false)}
                          >
                            <span className="text-lg">{category.icon}</span>
                            <span className={`font-medium ${category.color} group-hover:text-purple-600`}>
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/categories"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors"
                          onClick={() => setShowCategoryMenu(false)}
                        >
                          <BookOpen className="w-4 h-4" />
                          Xem tất cả danh mục 
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/bestsellers"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors px-3 py-2 rounded-lg hover:bg-orange-50"
              >
                <Star className="w-4 h-4" />
                Sách bán chạy
                {/* Hiển thị danh sách sách bán chạy nhất dạng từ trên xuống */}
              </Link>

              <Link
                to="/new-releases"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
              >
                <Sparkles className="w-4 h-4" />
                Sách mới
                {/* Hiển thị danh sách sách mới nhất dạng từ trên xuống */}
              </Link>

              <Link
                to="/promotions"
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <Gift className="w-4 h-4" />
                Khuyến mãi
                {/* Hiển thị danh sách khuyến mãi mới cho id khách có thể sử dụng: gồm thông tin 
                khuyến mãi, hạn sử dụng, điều kiện */}
              </Link>

              <Link
                to="/orderedhistory"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <Package className="w-4 h-4" />
                Lịch sử mua hàng
              </Link>
            </div>

            {/* Quick actions */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-gray-500">Miễn phí vận chuyển đơn từ 200k</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <div className="space-y-4">
              {/* Mobile search */}
              <div className="relative px-2">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:border-purple-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile navigation */}
              <div className="space-y-1 px-2">
                <div className="font-medium text-gray-900 px-3 py-2">Danh mục</div>
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span className={`font-medium ${category.color}`}>{category.name}</span>
                  </Link>
                ))}

                <div className="border-t border-gray-200 my-2"></div>

                <Link
                  to="/bestsellers"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">Sách bán chạy</span>
                </Link>

                <Link
                  to="/new-releases"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Sách mới</span>
                </Link>

                <Link
                  to="/promotions"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Gift className="w-4 h-4 text-red-600" />
                  <span className="text-gray-700">Khuyến mãi</span>
                </Link>

                <Link
                  to="/orderedhistory"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Lịch sử mua hàng</span>
                </Link>
              </div>

              {/* Mobile user section */}
              {!isLoggedIn && (
                <div className="flex gap-2 pt-4 border-t border-gray-200 px-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-3 border border-purple-200 rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center py-3 border border-purple-200 rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {showCategoryMenu && <div className="fixed inset-0 z-40" onClick={() => setShowCategoryMenu(false)}></div>}
    </header>
  )
}

export default Header