"use client"

import { useState } from "react"
import { Sparkles, Star, ShoppingCart, Zap, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

// Mock AI recommendations
const mockRecommendations = [
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 98000,
    original_price: 125000,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=150&h=200&fit=crop",
    rating: 4.5,
    reviews: 678,
    reason: "Cùng thể loại phát triển bản thân",
    confidence: 95,
  },
  {
    id: 7,
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro",
    price: 78000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=150&h=200&fit=crop",
    rating: 4.7,
    reviews: 1876,
    reason: "Phong cách kể chuyện tương tự",
    confidence: 88,
  },
  {
    id: 8,
    title: "The 7 Habits",
    author: "Stephen Covey",
    price: 145000,
    original_price: 190000,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=200&fit=crop",
    rating: 4.6,
    reviews: 543,
    reason: "Khách hàng cũng mua",
    confidence: 92,
  },
]

function AIRecommendations({ bookId }) {
  const [recommendations] = useState(mockRecommendations)
  const [isLoading, setIsLoading] = useState(false)

  const refreshRecommendations = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className="text-white p-6"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Gợi ý thông minh</h3>
              <p className="text-sm opacity-90">Dựa trên sở thích của bạn</p>
            </div>
          </div>
          <button
            onClick={refreshRecommendations}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <TrendingUp className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((book) => {
              const discount =
                book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0

              return (
                <div key={book.id} className="group">
                  <Link
                    to={`/book/${book.id}`}
                    className="flex gap-4 p-4 rounded-xl hover:shadow-lg transition-all border border-gray-100 hover:border-purple-200"
                  >
                    <div
                      className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 relative"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
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

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-purple-600">
                            {book.price.toLocaleString("vi-VN")}đ
                          </span>
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
                          }}
                          className="text-white p-2 rounded-lg transition-all shadow-sm transform hover:scale-105 btn-gradient"
                        >
                          <ShoppingCart className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          <Zap className="h-3 w-3" />
                          <span>{book.confidence}% phù hợp</span>
                        </div>
                        <span className="text-xs text-gray-500">{book.reason}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        <div
          className="mt-6 p-4 rounded-xl"
          style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
        >
          <div className="flex items-center gap-2 text-sm text-purple-700">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">AI đang học từ sở thích của bạn để gợi ý tốt hơn!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIRecommendations
