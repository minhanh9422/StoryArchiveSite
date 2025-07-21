"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, Plus, Minus, Zap } from "lucide-react"

// Mock book data
const mockBookData = {
  id: 1,
  title: "Nhà Giả Kim",
  author: "Paulo Coelho",
  price: 89000,
  original_price: 120000,
  image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  publisher: "NXB Văn Học",
  stock: 45,
  description: `"Nhà Giả Kim" là câu chuyện về Santiago, một chàng chăn cừu trẻ người Andalusia, người đã dám theo đuổi giấc mơ của mình. Từ quê nhà Tây Ban Nha, cậu đã đi đến những khu chợ ở Tangier và vượt qua sa mạc Sahara để đến Kim tự tháp Ai Cập, gặp gỡ Nhà giả kim.

Cuốn sách là một câu chuyện ngụ ngôn về việc theo đuổi ước mơ của mình, lắng nghe trái tim mình và đọc được những điềm báo mà cuộc sống gửi đến trên chặng đường đó.

Đây là một trong những cuốn sách bán chạy nhất mọi thời đại, đã được dịch ra hơn 80 ngôn ngữ và bán được hơn 65 triệu bản trên toàn thế giới.`,
  category: "Văn học",
  rating: 4.8,
  reviews: 1234,
}

function BookDetail({ bookId }) {
  const [bookData, setBookData] = useState(mockBookData)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedTab, setSelectedTab] = useState("description")

  const rating = bookData.rating
  const reviews = bookData.reviews
  const discount =
    bookData.original_price > bookData.price ? Math.round(100 - (bookData.price / bookData.original_price) * 100) : 0

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
        {/* Left: Image */}
        <div className="space-y-6">
          <div
            className="aspect-[3/4] rounded-2xl overflow-hidden relative group"
            style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
          >
            <img
              src={bookData.image_url || "/placeholder.svg"}
              alt={bookData.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discount > 0 && (
              <div
                className="absolute top-4 left-4 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
                style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
              >
                -{discount}%
              </div>
            )}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail gallery */}
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                style={{
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                }}
              >
                <img
                  src={`https://images.unsplash.com/photo-154494795${i}-fa07a98d237f?w=64&h=80&fit=crop`}
                  alt={`View ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-4 py-2 text-sm text-purple-700 rounded-full font-medium"
                style={{
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                }}
              >
                #{bookData.category}
              </span>
              <span
                className="px-4 py-2 text-sm text-blue-700 rounded-full font-medium"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                }}
              >
                {bookData.publisher}
              </span>
              {discount > 0 && (
                <span
                  className="px-4 py-2 text-sm text-red-700 rounded-full font-medium flex items-center gap-1"
                  style={{
                    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  }}
                >
                  <Zap className="w-3 h-3" />
                  Giảm {discount}%
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">{bookData.title}</h1>
            <p className="text-xl text-gray-600 mb-4">
              Tác giả: <span className="font-semibold text-purple-600">{bookData.author}</span>
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{rating}</span>
                <span className="text-gray-500">({reviews} đánh giá)</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-purple-600">{bookData.price.toLocaleString("vi-VN")}đ</span>
              {bookData.original_price > bookData.price && (
                <span className="text-2xl text-gray-500 line-through">
                  {bookData.original_price.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
            <p className="text-green-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full pulse"></span>
              Còn {bookData.stock} cuốn trong kho
            </p>
          </div>

          {/* Quantity + Actions */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg">Số lượng:</span>
              <div className="flex items-center border-2 border-purple-200 rounded-xl overflow-hidden">
                <button
                  className="px-4 py-3 text-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 min-w-[80px] text-center font-bold text-lg bg-purple-50">{quantity}</span>
                <button
                  className="px-4 py-3 text-xl hover:bg-purple-50 transition-colors"
                  onClick={() => setQuantity(Math.min(bookData.stock, quantity + 1))}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 text-white py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg transform hover:scale-105 font-semibold text-lg btn-gradient">
                <ShoppingCart className="h-6 w-6" />
                Thêm vào giỏ hàng
              </button>
              <button className="flex-1 border-2 border-purple-200 text-purple-600 py-4 rounded-xl hover:bg-purple-50 transition-colors font-semibold text-lg">
                Mua ngay
              </button>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center border-2 border-gray-200 px-4 py-3 rounded-xl gap-2 hover:bg-gray-50 transition-colors flex-1 justify-center">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
              <Truck className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-700">Giao hàng nhanh</span>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-700">Sách chính hãng</span>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
              <RotateCcw className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-orange-700">Đổi trả 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-100">
        <div className="flex border-b border-gray-100">
          {[
            { id: "description", label: "📖 Mô tả sách" },
            { id: "details", label: "📋 Thông tin chi tiết" },
            { id: "shipping", label: "🚚 Giao hàng & Đổi trả" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {selectedTab === "description" && (
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{bookData.description}</div>
            </div>
          )}

          {selectedTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Thông tin xuất bản</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tác giả:</span>
                    <span className="font-medium">{bookData.author}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Nhà xuất bản:</span>
                    <span className="font-medium">{bookData.publisher}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Thể loại:</span>
                    <span className="font-medium">{bookData.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Số trang:</span>
                    <span className="font-medium">163 trang</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Thông tin bán hàng</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Đánh giá:</span>
                    <span className="font-medium">{rating}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Số lượt đánh giá:</span>
                    <span className="font-medium">{reviews}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tình trạng:</span>
                    <span className="font-medium text-green-600">Còn hàng</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Kho:</span>
                    <span className="font-medium">{bookData.stock} cuốn</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "shipping" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    🚚 Chính sách giao hàng
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Giao hàng nhanh trong 24-48h tại TP.HCM và Hà Nội</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Miễn phí giao hàng cho đơn từ 150.000đ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Giao hàng toàn quốc qua bưu điện</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Kiểm tra hàng trước khi thanh toán</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">🔄 Chính sách đổi trả</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✅</span>
                      <span>Đổi trả trong vòng 7 ngày</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✅</span>
                      <span>Sách còn nguyên vẹn, chưa sử dụng</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✅</span>
                      <span>Hoàn tiền 100% nếu lỗi từ nhà sách</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✅</span>
                      <span>Hỗ trợ đổi sách khác cùng giá trị</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail
