"use client"

import { useState } from "react"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat"
import { Heart, ShoppingCart, Star, Eye, Trash2, Share2, Download, Filter } from "lucide-react"

// Mock wishlist data
const mockWishlistBooks = [
  {
    id: 501,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    original_price: 150000,
    image: "/placeholder.svg?height=300&width=200&text=Atomic+Habits",
    rating: 4.9,
    reviews: 1876,
    publisher: "NXB Thế Giới",
    description: "Cách xây dựng thói quen tốt và loại bỏ thói quen xấu một cách hiệu quả.",
    category: "Phát triển bản thân",
    added_date: "2024-01-15",
    availability: "in_stock",
    priority: "high",
  },
  {
    id: 502,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 135000,
    original_price: 180000,
    image: "/placeholder.svg?height=300&width=200&text=Sapiens",
    rating: 4.6,
    reviews: 1456,
    publisher: "NXB Thế Giới",
    description: "Lịch sử loài người từ thời tiền sử đến hiện đại.",
    category: "Lịch sử",
    added_date: "2024-01-10",
    availability: "in_stock",
    priority: "medium",
  },
  {
    id: 503,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 98000,
    original_price: 125000,
    image: "/placeholder.svg?height=300&width=200&text=Think+Grow+Rich",
    rating: 4.5,
    reviews: 678,
    publisher: "NXB Lao Động",
    description: "13 nguyên tắc để đạt được thành công và giàu có.",
    category: "Kinh doanh",
    added_date: "2024-01-08",
    availability: "low_stock",
    priority: "low",
  },
  {
    id: 504,
    title: "The 7 Habits",
    author: "Stephen Covey",
    price: 145000,
    original_price: 190000,
    image: "/placeholder.svg?height=300&width=200&text=7+Habits",
    rating: 4.6,
    reviews: 543,
    publisher: "NXB Thế Giới",
    description: "7 thói quen của những người thành đạt.",
    category: "Phát triển bản thân",
    added_date: "2024-01-05",
    availability: "out_of_stock",
    priority: "high",
  },
]

const WishlistPage = () => {
  const [wishlistBooks, setWishlistBooks] = useState(mockWishlistBooks)
  const [selectedBooks, setSelectedBooks] = useState([])
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const removeFromWishlist = (bookId) => {
    setWishlistBooks((prev) => prev.filter((book) => book.id !== bookId))
    setSelectedBooks((prev) => prev.filter((id) => id !== bookId))
  }

  const toggleSelectBook = (bookId) => {
    setSelectedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const selectAllBooks = () => {
    if (selectedBooks.length === wishlistBooks.length) {
      setSelectedBooks([])
    } else {
      setSelectedBooks(wishlistBooks.map((book) => book.id))
    }
  }

  const addSelectedToCart = () => {
    const availableBooks = wishlistBooks.filter(
      (book) => selectedBooks.includes(book.id) && book.availability !== "out_of_stock",
    )
    alert(`Đã thêm ${availableBooks.length} cuốn sách vào giỏ hàng!`)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getAvailabilityStatus = (availability) => {
    switch (availability) {
      case "in_stock":
        return { text: "Còn hàng", color: "text-green-600", bg: "bg-green-100" }
      case "low_stock":
        return { text: "Sắp hết", color: "text-yellow-600", bg: "bg-yellow-100" }
      case "out_of_stock":
        return { text: "Hết hàng", color: "text-red-600", bg: "bg-red-100" }
      default:
        return { text: "Không rõ", color: "text-gray-600", bg: "bg-gray-100" }
    }
  }

  const filteredBooks = wishlistBooks.filter((book) => {
    if (filterBy === "all") return true
    if (filterBy === "available") return book.availability === "in_stock"
    if (filterBy === "unavailable") return book.availability === "out_of_stock"
    return book.priority === filterBy
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "alphabetical":
        return a.title.localeCompare(b.title)
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      default:
        return new Date(b.added_date) - new Date(a.added_date)
    }
  })

  const totalValue = wishlistBooks.reduce((sum, book) => sum + book.price, 0)
  const totalSavings = wishlistBooks.reduce((sum, book) => sum + (book.original_price - book.price), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Heart className="w-12 h-12 fill-current" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">💖 Danh Sách Yêu Thích</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Những cuốn sách bạn đã lưu để đọc sau - đừng để chúng chờ đợi quá lâu!
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{wishlistBooks.length} cuốn sách</span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">Tiết kiệm {totalSavings.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{wishlistBooks.length}</h3>
                <p className="text-gray-600">Sách yêu thích</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {wishlistBooks.filter((book) => book.availability === "in_stock").length}
                </h3>
                <p className="text-gray-600">Có sẵn</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {(wishlistBooks.reduce((sum, book) => sum + book.rating, 0) / wishlistBooks.length).toFixed(1)}
                </h3>
                <p className="text-gray-600">Đánh giá TB</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString("vi-VN")}đ</h3>
                <p className="text-gray-600">Tổng giá trị</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={selectAllBooks}
                className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedBooks.length === wishlistBooks.length}
                  onChange={() => {}}
                  className="rounded"
                />
                Chọn tất cả ({selectedBooks.length})
              </button>

              {selectedBooks.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={addSelectedToCart}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ ({selectedBooks.length})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border-2 border-pink-200 rounded-lg px-3 py-2 focus:border-pink-500 focus:outline-none bg-pink-50"
                >
                  <option value="all">Tất cả</option>
                  <option value="available">Có sẵn</option>
                  <option value="unavailable">Hết hàng</option>
                  <option value="high">Ưu tiên cao</option>
                  <option value="medium">Ưu tiên trung bình</option>
                  <option value="low">Ưu tiên thấp</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-pink-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none bg-pink-50"
              >
                <option value="newest">🆕 Mới thêm</option>
                <option value="priority">⭐ Ưu tiên</option>
                <option value="alphabetical">🔤 A-Z</option>
                <option value="rating">⭐ Đánh giá</option>
                <option value="price-low">💰 Giá thấp đến cao</option>
                <option value="price-high">💎 Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {sortedBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Danh sách yêu thích trống</h3>
            <p className="text-gray-500 mb-6">Hãy thêm những cuốn sách bạn yêu thích vào đây!</p>
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
              Khám phá sách
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedBooks.map((book) => {
              const discount =
                book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0
              const availability = getAvailabilityStatus(book.availability)
              const daysAgo = Math.floor((new Date() - new Date(book.added_date)) / (1000 * 60 * 60 * 24))

              return (
                <div
                  key={book.id}
                  className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => toggleSelectBook(book.id)}
                      className="w-5 h-5 text-pink-600 bg-white border-2 border-gray-300 rounded focus:ring-pink-500"
                    />
                  </div>

                  {/* Priority Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(book.priority)}`}>
                      {book.priority === "high" ? "Cao" : book.priority === "medium" ? "TB" : "Thấp"}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="absolute top-12 right-3 z-10">
                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden relative">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        -{discount}%
                      </div>
                    )}

                    {/* Added Date */}
                    <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {daysAgo === 0 ? "Hôm nay" : `${daysAgo} ngày trước`}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Availability Status */}
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${availability.bg} ${availability.color}`}
                    >
                      {availability.text}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded-full">{book.category}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-pink-600 transition-colors">
                      {book.title}
                    </h3>

                    <p className="text-sm text-gray-600">Tác giả: {book.author}</p>
                    <p className="text-xs text-pink-600 font-medium">{book.publisher}</p>

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

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-pink-600">{book.price.toLocaleString("vi-VN")}đ</span>
                      {book.original_price > book.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {book.original_price.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        className={`flex-1 flex items-center justify-center text-sm px-3 py-2 rounded-lg transition-all shadow-lg transform hover:scale-105 ${
                          book.availability === "out_of_stock"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
                        }`}
                        disabled={book.availability === "out_of_stock"}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {book.availability === "out_of_stock" ? "Hết hàng" : "Thêm vào giỏ"}
                      </button>
                      <button className="flex-1 text-sm border-2 border-pink-200 text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all">
                        <Eye className="h-4 w-4 mr-1 inline" />
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
      <AIChat />
    </div>
  )
}

export default WishlistPage
