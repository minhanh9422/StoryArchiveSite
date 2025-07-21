"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Eye, Filter, ChevronDown, ChevronUp, Gift, Percent, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat"
import BookPreview from "../components/books/book_preview"

const promotionBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 69000,
    original_price: 120000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 1234,
    publisher: "NXB Văn Học",
    description: "Cuốn sách về hành trình tìm kiếm ước mơ và khám phá bản thân của chàng chăn cừu Santiago.",
    category: "Văn học",
    promotion_type: "flash_sale",
    promotion_end: "2024-02-15T23:59:59",
    stock: 50,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 55000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    rating: 4.7,
    reviews: 987,
    publisher: "NXB Tổng Hợp",
    description: "Nghệ thuật giao tiếp và ứng xử để thành công trong cuộc sống.",
    category: "Tâm lý",
    promotion_type: "weekend_deal",
    promotion_end: "2024-02-11T23:59:59",
    stock: 120,
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 99000,
    original_price: 180000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
    rating: 4.6,
    reviews: 1456,
    publisher: "NXB Thế Giới",
    description: "Lịch sử loài người từ thời tiền sử đến hiện đại.",
    category: "Lịch sử",
    promotion_type: "mega_sale",
    promotion_end: "2024-02-20T23:59:59",
    stock: 80,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    price: 89000,
    original_price: 150000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
    rating: 4.9,
    reviews: 756,
    publisher: "NXB Thế Giới",
    description: "Cách xây dựng thói quen tốt và loại bỏ thói quen xấu một cách hiệu quả.",
    category: "Phát triển bản thân",
    promotion_type: "buy_2_get_1",
    promotion_end: "2024-02-25T23:59:59",
    stock: 200,
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 95000,
    original_price: 165000,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 892,
    publisher: "NXB Lao Động",
    description: "Tâm lý học về tiền bạc và đầu tư thông minh.",
    category: "Tài chính",
    promotion_type: "combo_deal",
    promotion_end: "2024-02-18T23:59:59",
    stock: 150,
  },
]

const categories = ["Tất cả", "Văn học", "Tâm lý", "Lịch sử", "Phát triển bản thân", "Tài chính"]
const publishers = ["Tất cả", "NXB Văn Học", "NXB Tổng Hợp", "NXB Thế Giới", "NXB Lao Động"]
const promotionTypes = [
  { value: "all", label: "Tất cả khuyến mãi" },
  { value: "flash_sale", label: "⚡ Flash Sale" },
  { value: "weekend_deal", label: "🎯 Deal cuối tuần" },
  { value: "mega_sale", label: "💥 Mega Sale" },
  { value: "buy_2_get_1", label: "🎁 Mua 2 tặng 1" },
  { value: "combo_deal", label: "📦 Combo Deal" },
]

function PromotionsPage() {
  const [books] = useState(promotionBooks)
  const [sortBy, setSortBy] = useState("discount")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedPublisher, setSelectedPublisher] = useState("Tất cả")
  const [selectedPromotionType, setSelectedPromotionType] = useState("all")
  const [favorites, setFavorites] = useState([])
  const [previewBook, setPreviewBook] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    publisher: true,
    promotion: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleFavorite = (bookId) => {
    setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const resetFilters = () => {
    setSelectedCategory("Tất cả")
    setSelectedPublisher("Tất cả")
    setSelectedPromotionType("all")
    setSortBy("discount")
  }

  const filteredBooks = books
    .filter((book) => {
      const categoryMatch = selectedCategory === "Tất cả" || book.category === selectedCategory
      const publisherMatch = selectedPublisher === "Tất cả" || book.publisher === selectedPublisher
      const promotionMatch = selectedPromotionType === "all" || book.promotion_type === selectedPromotionType
      return categoryMatch && publisherMatch && promotionMatch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "discount":
        default:
          const discountA = Math.round(100 - (a.price / a.original_price) * 100)
          const discountB = Math.round(100 - (b.price / b.original_price) * 100)
          return discountB - discountA
      }
    })

  const getPromotionBadge = (type) => {
    const badges = {
      flash_sale: { label: "⚡ Flash Sale", color: "bg-red-500" },
      weekend_deal: { label: "🎯 Weekend Deal", color: "bg-purple-500" },
      mega_sale: { label: "💥 Mega Sale", color: "bg-orange-500" },
      buy_2_get_1: { label: "🎁 Mua 2 tặng 1", color: "bg-green-500" },
      combo_deal: { label: "📦 Combo Deal", color: "bg-blue-500" },
    }
    const badge = badges[type]
    return (
      <span className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg ${badge.color}`}>
        {badge.label}
      </span>
    )
  }

  const getTimeRemaining = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end - now

    if (diff <= 0) return "Đã kết thúc"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `Còn ${days} ngày ${hours}h`
    return `Còn ${hours}h`
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
              <Gift className="w-12 h-12 text-red-500" />
              Khuyến Mãi Đặc Biệt
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Cơ hội vàng để sở hữu những cuốn sách yêu thích với giá ưu đãi không thể bỏ lỡ
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 space-y-6">
              {/* Filter Header */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border border-red-200"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-red-600" />
                    Bộ lọc
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Promotion Type Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
                <button
                  onClick={() => toggleSection("promotion")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">🎉 Loại khuyến mãi</span>
                  {expandedSections.promotion ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.promotion && (
                  <div className="px-6 pb-4 space-y-2">
                    {promotionTypes.map((type) => (
                      <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="promotion"
                          value={type.value}
                          checked={selectedPromotionType === type.value}
                          onChange={(e) => setSelectedPromotionType(e.target.value)}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-gray-700 group-hover:text-red-600 transition-colors">{type.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
                <button
                  onClick={() => toggleSection("category")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">📚 Thể loại</span>
                  {expandedSections.category ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.category && (
                  <div className="px-6 pb-4 space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-gray-700 group-hover:text-red-600 transition-colors">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Publisher Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
                <button
                  onClick={() => toggleSection("publisher")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">🏢 Nhà xuất bản</span>
                  {expandedSections.publisher ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.publisher && (
                  <div className="px-6 pb-4 space-y-2">
                    {publishers.map((publisher) => (
                      <label key={publisher} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="publisher"
                          value={publisher}
                          checked={selectedPublisher === publisher}
                          onChange={(e) => setSelectedPublisher(e.target.value)}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-gray-700 group-hover:text-red-600 transition-colors">{publisher}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Books Grid */}
            <div className="flex-1">
              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-red-200 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Percent className="w-6 h-6 text-red-600" />
                    {filteredBooks.length} sách đang khuyến mãi
                  </h2>
                  <p className="text-gray-600">Tiết kiệm đến 50% cho những cuốn sách chọn lọc</p>
                </div>

                <div className="flex items-center gap-4">
                  <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
                    Sắp xếp theo:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-red-200 rounded-lg px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                    }}
                  >
                    <option value="discount">🔥 Giảm giá nhiều nhất</option>
                    <option value="rating">⭐ Đánh giá cao nhất</option>
                    <option value="price-low">💰 Giá thấp đến cao</option>
                    <option value="price-high">💎 Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              {/* Books Grid */}
              {filteredBooks.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-red-200">
                  <Gift className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Không tìm thấy khuyến mãi phù hợp</h3>
                  <p className="text-gray-600 mb-6">Thử điều chỉnh bộ lọc để xem thêm ưu đãi</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all"
                    style={{
                      background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                    }}
                  >
                    Reset bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => {
                    const discount = Math.round(100 - (book.price / book.original_price) * 100)

                    return (
                      <div
                        key={book.id}
                        className="relative group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100"
                      >
                        {/* Promotion Badge */}
                        <div className="absolute top-3 left-3 z-10">{getPromotionBadge(book.promotion_type)}</div>

                        {/* Discount Badge */}
                        <div className="absolute top-3 right-3 z-10">
                          <span
                            className="text-white text-lg px-3 py-1 rounded-full font-bold shadow-lg"
                            style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}
                          >
                            -{discount}%
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <div className="absolute top-12 right-3 z-10">
                          <button
                            onClick={() => toggleFavorite(book.id)}
                            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                favorites.includes(book.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Image */}
                        <div
                          className="aspect-[3/4] overflow-hidden relative"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                          }}
                        >
                          <img
                            src={book.image || "/placeholder.svg"}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                            <div className="flex justify-center items-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setPreviewBook(book)}
                                  className="bg-white/90 text-gray-800 px-4 py-2 rounded-full hover:bg-white transition-all flex items-center gap-1 shadow-lg"
                                >
                                  <Eye className="h-4 w-4" />
                                  Xem trước
                                </button>
                                <Link to={`/book/${book.id}`}>
                                  <button
                                    className="text-white px-4 py-2 rounded-full shadow-lg"
                                    style={{
                                      background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                                    }}
                                  >
                                    Chi tiết
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 hover:text-red-600 line-clamp-2 text-sm leading-tight">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                            <p className="text-xs text-red-600 font-medium">{book.publisher}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-red-500" />
                              {getTimeRemaining(book.promotion_end)}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs font-medium ml-1">{book.rating}</span>
                            <span className="text-xs text-gray-500">({book.reviews})</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-red-600">
                                {book.price.toLocaleString("vi-VN")}đ
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {book.original_price.toLocaleString("vi-VN")}đ
                              </span>
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              Tiết kiệm {(book.original_price - book.price).toLocaleString("vi-VN")}đ
                            </div>
                            <div className="text-xs text-gray-500">Còn lại: {book.stock} cuốn</div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              className="flex-1 flex items-center justify-center text-white text-sm px-3 py-2 rounded-lg transition-all shadow-lg transform hover:scale-105"
                              style={{
                                background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Thêm vào giỏ
                            </button>
                            <button className="flex-1 text-sm border-2 border-red-200 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                              Mua ngay
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat />

      {/* Book Preview Modal */}
      {previewBook && <BookPreview book={previewBook} onClose={() => setPreviewBook(null)} />}
    </>
  )
}

export default PromotionsPage
