"use client"

import { useState } from "react"
import { X, Star, ShoppingCart, Heart, Share2 } from "lucide-react"

function BookPreview({ book, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const discount = book.original_price > book.price ? Math.round(100 - (book.price / book.original_price) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Xem trước sách</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left: Image */}
          <div className="space-y-4">
            <div
              className="aspect-[3/4] rounded-xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
              }}
            >
              <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
              {discount > 0 && (
                <div
                  className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium"
                  style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
                >
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 text-sm text-purple-700 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  }}
                >
                  {book.category}
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{book.publisher}</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">Tác giả: {book.author}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews} đánh giá)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-purple-600">{book.price.toLocaleString("vi-VN")}đ</span>
                {book.original_price > book.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {book.original_price.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              <p className="text-green-600 font-medium">✅ Còn hàng - Giao hàng nhanh</p>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Số lượng:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                  <button
                    className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg btn-gradient">
                  <ShoppingCart className="h-5 w-5" />
                  Thêm vào giỏ hàng
                </button>
                <button className="flex-1 border-2 border-purple-200 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                  Mua ngay
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center border-2 border-gray-200 px-4 py-2 rounded-lg gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                  Yêu thích
                </button>
                <button className="flex items-center border-2 border-gray-200 px-4 py-2 rounded-lg gap-2 hover:bg-gray-50 transition-colors">
                  <Share2 className="h-4 w-4 text-gray-500" />
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Description */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
              }}
            >
              <h3 className="font-semibold mb-2 text-purple-800">📖 Mô tả sách</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-semibold">🚚</div>
                <div className="text-xs text-green-700">Giao hàng nhanh</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-semibold">🛡️</div>
                <div className="text-xs text-blue-700">Sách chính hãng</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-orange-600 font-semibold">🔄</div>
                <div className="text-xs text-orange-700">Đổi trả 7 ngày</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPreview
