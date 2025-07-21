"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Percent } from "lucide-react"
import { Link , useNavigate} from "react-router-dom"

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    original_price: 120000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
    quantity: 2,
    stock: 45,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 75000,
    original_price: 95000,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop",
    quantity: 1,
    stock: 32,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 120000,
    original_price: 150000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop",
    quantity: 1,
    stock: 28,
  },
]

function ShoppingCartMain() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(null)
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 0.1, description: "Giảm 10%" })
      alert("Áp dụng mã giảm giá thành công!")
    } else if (promoCode.toLowerCase() === "freeship") {
      setAppliedPromo({ code: "FREESHIP", discount: 0, description: "Miễn phí vận chuyển" })
      alert("Áp dụng mã miễn phí vận chuyển thành công!")
    } else {
      alert("Mã giảm giá không hợp lệ!")
    }
    setPromoCode("")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => sum + (item.original_price - item.price) * item.quantity, 0)
  const promoDiscount = appliedPromo?.discount ? subtotal * appliedPromo.discount : 0
  const shipping = appliedPromo?.code === "FREESHIP" ? 0 : subtotal >= 150000 ? 0 : 30000
  const total = subtotal - promoDiscount + shipping
  

  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
        }}
      >
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-md">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
          >
            <ShoppingBag className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-8">Hãy thêm một vài cuốn sách yêu thích vào giỏ hàng nhé!</p>
          <Link to="/">
            <button className="text-white px-8 py-3 rounded-full transition-all shadow-lg transform hover:scale-105 btn-gradient">
              Khám phá sách ngay
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
            <p className="text-gray-600">{cartItems.length} sản phẩm</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const discount =
                item.original_price > item.price ? Math.round(100 - (item.price / item.original_price) * 100) : 0

              return (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex gap-6">
                    <div
                      className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 relative"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                      }}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {discount > 0 && (
                        <div
                          className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full font-bold"
                          style={{ background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)" }}
                        >
                          -{discount}%
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600">{item.author}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-purple-600">
                              {item.price.toLocaleString("vi-VN")}đ
                            </span>
                            {item.original_price > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {item.original_price.toLocaleString("vi-VN")}đ
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <button
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[60px] text-center font-medium bg-gray-50">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                            </div>
                            <div className="text-sm text-gray-500">Còn {item.stock} cuốn</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Mã giảm giá</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={applyPromoCode}
                  className="text-white px-6 py-3 rounded-lg transition-all shadow-lg btn-gradient"
                >
                  Áp dụng
                </button>
              </div>
              {appliedPromo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {appliedPromo.code}: {appliedPromo.description}
                    </span>
                  </div>
                  <button onClick={() => setAppliedPromo(null)} className="text-green-600 hover:text-green-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">Gợi ý: SAVE10 (giảm 10%), FREESHIP (miễn phí vận chuyển)</div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{subtotal.toLocaleString("vi-VN")}đ</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Tiết kiệm:</span>
                    <span className="font-medium">-{totalSavings.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({appliedPromo.code}):</span>
                    <span className="font-medium">-{promoDiscount.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>

                {subtotal < 150000 && shipping > 0 && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Mua thêm {(150000 - subtotal).toLocaleString("vi-VN")}đ để được miễn phí vận chuyển
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-purple-600">{total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
                
              <button onClick={() => navigate("/checkout")}
               className="w-full text-white py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 btn-gradient"
               >
                Tiến hành thanh toán
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-4 text-center">
                <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-4 text-2xl">🔒 💳 🚚</div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Mua sắm an toàn & tiện lợi</p>
                  <p>✅ Thanh toán bảo mật SSL</p>
                  <p>✅ Giao hàng nhanh chóng</p>
                  <p>✅ Đổi trả trong 7 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartMain
