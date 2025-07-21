"use client"

import { useState } from "react"
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Crown,
  FlameIcon as Fire,
} from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat"
import BookPreview from "../components/books/book_preview"

const bestsellerBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    original_price: 120000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 12340,
    quantity_sold: 25000,
    publisher: "NXB Văn Học",
    description: "Cuốn sách về hành trình tìm kiếm ước mơ và khám phá bản thân của chàng chăn cừu Santiago.",
    category: "Văn học",
    rank: 1,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 75000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    rating: 4.7,
    reviews: 9870,
    quantity_sold: 32000,
    publisher: "NXB Tổng Hợp",
    description: "Nghệ thuật giao tiếp và ứng xử để thành công trong cuộc sống.",
    category: "Tâm lý",
    rank: 2,
  },
  {
    id: 3,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    price: 65000,
    original_price: 85000,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 21340,
    quantity_sold: 45000,
    publisher: "NXB Trẻ",
    description: "Câu chuyện tuổi thơ đầy cảm động về tình anh em và tình yêu đầu đời.",
    category: "Văn học Việt Nam",
    rank: 3,
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 135000,
    original_price: 180000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
    rating: 4.6,
    reviews: 14560,
    quantity_sold: 18000,
    publisher: "NXB Thế Giới",
    description: "Lịch sử loài người từ thời tiền sử đến hiện đại.",
    category: "Lịch sử",
    rank: 4,
  },
  {
    id: 5,
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro",
    price: 78000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
    rating: 4.7,
    reviews: 18760,
    quantity_sold: 28900,
    publisher: "NXB Hội Nhà Văn",
    description: "Câu chuyện cảm động về tuổi thơ của cậu bé Zezé.",
    category: "Văn học",
    rank: 5,
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    original_price: 150000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
    rating: 4.9,
    reviews: 7560,
    quantity_sold: 8900,
    publisher: "NXB Thế Giới",
    description: "Cách xây dựng thói quen tốt và loại bỏ thói quen xấu một cách hiệu quả.",
    category: "Phát triển bản thân",
    rank: 6,
  },
]

const categories = ["Tất cả", "Văn học", "Tâm lý", "Văn học Việt Nam", "Lịch sử", "Phát triển bản thân"]
const publishers = ["Tất cả", "NXB Văn Học", "NXB Tổng Hợp", "NXB Trẻ", "NXB Thế Giới", "NXB Hội Nhà Văn"]
const priceRanges = [
  { label: "Tất cả", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Dưới 100k", min: 0, max: 100000 },
  { label: "100k - 150k", min: 100000, max: 150000 },
  { label: "Trên 150k", min: 150000, max: Number.POSITIVE_INFINITY },
]

function BestsellersPage() {
  const [books] = useState(bestsellerBooks)
  const [sortBy, setSortBy] = useState("bestselling")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedPublisher, setSelectedPublisher] = useState("Tất cả")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [previewBook, setPreviewBook] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    publisher: true,
    price: true,
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
    setSelectedPriceRange(0)
    setSortBy("bestselling")
  }

  const filteredBooks = books
    .filter((book) => {
      const categoryMatch = selectedCategory === "Tất cả" || book.category === selectedCategory
      const publisherMatch = selectedPublisher === "Tất cả" || book.publisher === selectedPublisher
      const priceRange = priceRanges[selectedPriceRange]
      const priceMatch = book.price >= priceRange.min && book.price <= priceRange.max
      return categoryMatch && publisherMatch && priceMatch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "bestselling":
        default:
          return b.quantity_sold - a.quantity_sold
      }
    })

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1"
            style={{ background: "linear-gradient(135deg, #ffd700 0%, #ffb347 100%)" }}
          >
            <Crown className="w-3 h-3" />
            #1
          </span>
        </div>
      )
    } else if (rank <= 3) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
            style={{ background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)" }}
          >
            #{rank}
          </span>
        </div>
      )
    } else if (rank <= 10) {
      return (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg"
            style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)" }}
          >
            #{rank}
          </span>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
              <Fire className="w-12 h-12 text-orange-500" />
              Sách Bán Chạy Nhất
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Top những cuốn sách được yêu thích nhất, được hàng nghìn độc giả tin tưởng lựa chọn
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 space-y-6">
              {/* Filter Header */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200"
                style={{
                  background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-600" />
                    Bộ lọc
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-orange-600 hover:text-orange-800 transition-colors px-3 py-1 rounded-lg hover:bg-orange-50"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
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
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-gray-700 group-hover:text-orange-600 transition-colors">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Publisher Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
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
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-gray-700 group-hover:text-orange-600 transition-colors">{publisher}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
                <button
                  onClick={() => toggleSection("price")}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">💰 Khoảng giá</span>
                  {expandedSections.price ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.price && (
                  <div className="px-6 pb-4 space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="price"
                          value={index}
                          checked={selectedPriceRange === index}
                          onChange={(e) => setSelectedPriceRange(Number.parseInt(e.target.value))}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Books Grid */}
            <div className="flex-1">
              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-orange-200 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                    Top {filteredBooks.length} sách bán chạy
                  </h2>
                  <p className="text-gray-600">Được xếp hạng dựa trên số lượng bán ra</p>
                </div>

                <div className="flex items-center gap-4">
                  <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
                    Sắp xếp theo:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
                    }}
                  >
                    <option value="bestselling">🔥 Bán chạy nhất</option>
                    <option value="rating">⭐ Đánh giá cao nhất</option>
                    <option value="price-low">💰 Giá thấp đến cao</option>
                    <option value="price-high">💎 Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              {/* Books Grid */}
              {filteredBooks.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-orange-200">
                  <Fire className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Không tìm thấy sách phù hợp</h3>
                  <p className="text-gray-600 mb-6">Thử điều chỉnh bộ lọc để xem thêm sách bán chạy</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all"
                    style={{
                      background: "linear-gradient(135deg, #fb923c 0%, #ef4444 100%)",
                    }}
                  >
                    Reset bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => {
                    const discount =
                      book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0

                    return (
                      <div
                        key={book.id}
                        className="relative group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100"
                      >
                        {/* Rank Badge */}
                        {getRankBadge(book.rank)}

                        {/* Discount Badge */}
                        {discount > 0 && (
                          <div className="absolute top-3 right-3 z-10">
                            <span
                              className="text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg"
                              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" }}
                            >
                              -{discount}%
                            </span>
                          </div>
                        )}

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
                              "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
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
                                      background: "linear-gradient(135deg, #fb923c 0%, #ef4444 100%)",
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
                            <h3 className="font-semibold text-gray-900 hover:text-orange-600 line-clamp-2 text-sm leading-tight">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                            <p className="text-xs text-orange-600 font-medium">{book.publisher}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Fire className="w-3 h-3 text-orange-500" />
                              Đã bán {book.quantity_sold.toLocaleString()} cuốn
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
                            <span className="text-xs text-gray-500">({book.reviews.toLocaleString()})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-orange-600">
                              {book.price.toLocaleString("vi-VN")}đ
                            </span>
                            {book.original_price > book.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {book.original_price.toLocaleString("vi-VN")}đ
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              className="flex-1 flex items-center justify-center text-white text-sm px-3 py-2 rounded-lg transition-all shadow-lg transform hover:scale-105"
                              style={{
                                background: "linear-gradient(135deg, #fb923c 0%, #ef4444 100%)",
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Thêm vào giỏ
                            </button>
                            <button className="flex-1 text-sm border-2 border-orange-200 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all">
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

export default BestsellersPage
