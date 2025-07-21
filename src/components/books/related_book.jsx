"use client"

import { Star, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

// Mock related books data
const mockRelatedBooks = [
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 75000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop",
    rating: 4.7,
    reviews: 987,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    original_price: 150000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop",
    rating: 4.9,
    reviews: 756,
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 135000,
    original_price: 180000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&h=200&fit=crop",
    rating: 4.6,
    reviews: 1456,
  },
  {
    id: 5,
    title: "Tôi Thấy Hoa Vàng",
    author: "Nguyễn Nhật Ánh",
    price: 65000,
    original_price: 85000,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=150&h=200&fit=crop",
    rating: 4.8,
    reviews: 2134,
  },
]

function RelatedBooks({ bookId }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" }}
        >
          <span className="text-white font-bold text-lg">📚</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Sách liên quan</h3>
          <p className="text-sm text-gray-600">Những cuốn sách bạn có thể thích</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockRelatedBooks.map((book) => {
          const discount =
            book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0

          return (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="flex gap-4 p-4 rounded-xl hover:shadow-lg transition-all border border-gray-100 hover:border-purple-200 group"
            >
              <div
                className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 relative"
                style={{
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                }}
              >
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {discount > 0 && (
                  <div
                    className="absolute -top-1 -right-1 text-white text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
                  >
                    -{discount}%
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors text-sm mb-1">
                  {book.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{book.author}</p>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{book.rating}</span>
                  <span className="text-xs text-gray-500">({book.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{book.price.toLocaleString("vi-VN")}đ</span>
                    {book.original_price > book.price && (
                      <span className="text-xs text-gray-500 line-through">
                        {book.original_price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Add to cart logic
                    }}
                    className="text-white p-2 rounded-lg transition-all shadow-sm transform hover:scale-105 btn-gradient"
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="text-center mt-6">
        <button className="text-white px-6 py-2 rounded-full text-sm transition-all shadow-lg transform hover:scale-105 btn-gradient">
          Xem thêm sách tương tự
        </button>
      </div>
    </div>
  )
}

export default RelatedBooks
