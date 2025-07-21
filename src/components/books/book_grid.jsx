"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star, Eye, Zap, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import BookPreview from "./book_preview"

// Mock data with bright, appealing books
const mockBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    original_price: 120000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 1234,
    is_new: false,
    quantity_sold: 2500,
    publisher: "NXB Văn Học",
    description: "Cuốn sách về hành trình tìm kiếm ước mơ và khám phá bản thân của chàng chăn cừu Santiago.",
    category: "Văn học",
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 75000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    rating: 4.7,
    reviews: 987,
    is_new: false,
    quantity_sold: 3200,
    publisher: "NXB Tổng Hợp",
    description: "Nghệ thuật giao tiếp và ứng xử để thành công trong cuộc sống.",
    category: "Tâm lý",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    original_price: 150000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
    rating: 4.9,
    reviews: 756,
    is_new: true,
    quantity_sold: 890,
    publisher: "NXB Thế Giới",
    description: "Cách xây dựng thói quen tốt và loại bỏ thói quen xấu một cách hiệu quả.",
    category: "Phát triển bản thân",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 135000,
    original_price: 180000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
    rating: 4.6,
    reviews: 1456,
    is_new: false,
    quantity_sold: 1800,
    publisher: "NXB Thế Giới",
    description: "Lịch sử loài người từ thời tiền sử đến hiện đại.",
    category: "Lịch sử",
  },
  {
    id: 5,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    price: 65000,
    original_price: 85000,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=300&fit=crop",
    rating: 4.8,
    reviews: 2134,
    is_new: false,
    quantity_sold: 4500,
    publisher: "NXB Trẻ",
    description: "Câu chuyện tuổi thơ đầy cảm động về tình anh em và tình yêu đầu đời.",
    category: "Văn học Việt Nam",
  },
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 98000,
    original_price: 125000,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
    rating: 4.5,
    reviews: 678,
    is_new: true,
    quantity_sold: 567,
    publisher: "NXB Lao Động",
    description: "13 nguyên tắc để đạt được thành công và giàu có.",
    category: "Kinh doanh",
  },
  {
    id: 7,
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro",
    price: 78000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
    rating: 4.7,
    reviews: 1876,
    is_new: false,
    quantity_sold: 2890,
    publisher: "NXB Hội Nhà Văn",
    description: "Câu chuyện cảm động về tuổi thơ của cậu bé Zezé.",
    category: "Văn học",
  },
  {
    id: 8,
    title: "The 7 Habits",
    author: "Stephen Covey",
    price: 145000,
    original_price: 190000,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop",
    rating: 4.6,
    reviews: 543,
    is_new: true,
    quantity_sold: 234,
    publisher: "NXB Thế Giới",
    description: "7 thói quen của những người thành đạt.",
    category: "Phát triển bản thân",
  },
]

function BookGrid() {
  const [books] = useState(mockBooks)
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState([])
  const [previewBook, setPreviewBook] = useState(null)

  const toggleFavorite = (bookId) => {
    setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.is_new ? 1 : -1
      default:
        return b.quantity_sold - a.quantity_sold
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-purple-600">📚</span>
            Tất cả sách
          </h2>
          <p className="text-gray-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Tìm thấy <span className="font-semibold text-purple-600">{books.length}</span> cuốn sách
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
            Sắp xếp theo:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-purple-200 rounded-lg px-4 py-2 text-sm focus:border-purple-500 focus:outline-none"
            style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
          >
            <option value="popular">🔥 Phổ biến nhất</option>
            <option value="newest">✨ Mới nhất</option>
            <option value="price-low">💰 Giá thấp đến cao</option>
            <option value="price-high">💎 Giá cao đến thấp</option>
            <option value="rating">⭐ Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedBooks.map((book) => {
          const discount =
            book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0

          return (
            <div
              key={book.id}
              className="relative group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 card-hover"
            >
              {/* LABELS */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {book.is_new && (
                  <span
                    className="text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg flex items-center gap-1"
                    style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
                  >
                    <Zap className="w-3 h-3" />
                    Mới
                  </span>
                )}
                {book.quantity_sold > 1000 && (
                  <span
                    className="text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg flex items-center gap-1"
                    style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
                  >
                    🔥 Bán chạy
                  </span>
                )}
                {discount > 0 && (
                  <span
                    className="text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg"
                    style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" }}
                  >
                    -{discount}%
                  </span>
                )}
              </div>

              {/* FAVORITE BUTTON */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </button>
              </div>

              {/* IMAGE */}
              <div
                className="aspect-[3/4] overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
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
                        <button className="text-white px-4 py-2 rounded-full shadow-lg btn-gradient">Chi tiết</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 hover:text-purple-600 line-clamp-2 text-sm leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                  <p className="text-xs text-purple-600 font-medium">{book.publisher}</p>
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

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-purple-600">{book.price.toLocaleString("vi-VN")}đ</span>
                  {book.original_price > book.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {book.original_price.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center text-white text-sm px-3 py-2 rounded-lg transition-all shadow-lg transform hover:scale-105 btn-gradient">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Thêm vào giỏ
                  </button>
                  <button className="flex-1 text-sm border-2 border-purple-200 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-all">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center pt-8">
        <button className="text-white px-8 py-3 rounded-full transition-all shadow-lg transform hover:scale-105 flex items-center gap-2 btn-gradient">
          <span>Xem thêm sách</span>
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>

      {/* Book Preview Modal */}
      {previewBook && <BookPreview book={previewBook} onClose={() => setPreviewBook(null)} />}
    </div>
  )
}

export default BookGrid
