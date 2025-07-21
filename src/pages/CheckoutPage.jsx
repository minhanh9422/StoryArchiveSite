"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CreditCard, Truck, MapPin, Shield, Navigation, Clock, CheckCircle } from "lucide-react"

// Mock cart items
const cartItems = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    originalPrice: 120000,
    image: "/placeholder.svg?height=80&width=60&text=Nhà+Giả+Kim",
    quantity: 2,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 75000,
    originalPrice: 95000,
    image: "/placeholder.svg?height=80&width=60&text=Đắc+Nhân+Tâm",
    quantity: 1,
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 120000,
    originalPrice: 150000,
    image: "/placeholder.svg?height=80&width=60&text=Sapiens",
    quantity: 1,
  },
]

// Mock địa chỉ gợi ý dựa trên vị trí
const mockAddressSuggestions = [
  {
    id: 1,
    fullAddress: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    ward: "Bến Nghé",
    district: "Quận 1",
    city: "TP.HCM",
    distance: "0.5km",
  },
  {
    id: 2,
    fullAddress: "456 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM",
    ward: "Bến Thành",
    district: "Quận 1",
    city: "TP.HCM",
    distance: "0.8km",
  },
  {
    id: 3,
    fullAddress: "789 Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM",
    ward: "Bến Nghé",
    district: "Quận 1",
    city: "TP.HCM",
    distance: "1.2km",
  },
]

function CheckoutPage() {
  const navigate = useNavigate()
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [saveInfo, setSaveInfo] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationPermission, setLocationPermission] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [errors, setErrors] = useState({})

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const shippingCost = shippingMethod === "express" ? 50000 : subtotal >= 150000 ? 0 : 30000
  const total = subtotal + shippingCost

  // Kiểm tra quyền truy cập vị trí khi component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state)
        if (result.state === "granted") {
          setShowLocationModal(false)
        } else if (result.state === "prompt") {
          setShowLocationModal(true)
        }
      })
    }
  }, [])

  // Lấy vị trí hiện tại
  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          setLocationPermission("granted")
          setShowLocationModal(false)

          // Mock API call để lấy địa chỉ gợi ý
          setTimeout(() => {
            setAddressSuggestions(mockAddressSuggestions)
            setShowSuggestions(true)
            setIsLoadingLocation(false)
          }, 1000)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationPermission("denied")
          setIsLoadingLocation(false)
          alert("Không thể lấy vị trí. Vui lòng nhập địa chỉ thủ công.")
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      )
    } else {
      setIsLoadingLocation(false)
      alert("Trình duyệt không hỗ trợ định vị.")
    }
  }

  // Chọn địa chỉ gợi ý
  const selectSuggestedAddress = (suggestion) => {
    setShippingInfo({
      ...shippingInfo,
      address: suggestion.fullAddress,
      ward: suggestion.ward,
      district: suggestion.district,
      city: suggestion.city,
    })
    setShowSuggestions(false)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!shippingInfo.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên"
    if (!shippingInfo.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại"
    if (!shippingInfo.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ"
    if (!shippingInfo.ward.trim()) newErrors.ward = "Vui lòng nhập phường/xã"
    if (!shippingInfo.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện"
    if (!shippingInfo.city.trim()) newErrors.city = "Vui lòng nhập tỉnh/thành phố"
    if (!agreeTerms) newErrors.terms = "Vui lòng đồng ý với điều khoản"

    // Validate phone number
    const phoneRegex = /^[0-9]{10,11}$/
    if (shippingInfo.phone && !phoneRegex.test(shippingInfo.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    // Validate email if provided
    if (shippingInfo.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(shippingInfo.email)) {
        newErrors.email = "Email không hợp lệ"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    console.log("Order submitted", { shippingInfo, paymentMethod, shippingMethod, cartItems })
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Story Archive.")
    navigate("/")
  }

  const handleInputChange = (field, value) => {
    setShippingInfo({ ...shippingInfo, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/shoppingcart"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại giỏ hàng
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-purple-600">💳</span>
              Thanh toán
            </h1>
            <p className="text-gray-600 mt-2">Hoàn tất đơn hàng của bạn một cách nhanh chóng và an toàn</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-purple-600" />
                  Thông tin giao hàng
                </h2>

                {/* Location Button */}
                <button
                  type="button"
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  Dùng vị trí hiện tại
                </button>
              </div>

              {/* Address Suggestions */}
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Địa chỉ gần bạn
                  </h3>
                  <div className="space-y-2">
                    {addressSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        type="button"
                        onClick={() => selectSuggestedAddress(suggestion)}
                        className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.fullAddress}</div>
                            <div className="text-sm text-gray-600">Cách {suggestion.distance}</div>
                          </div>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.fullName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                    required
                    placeholder="Họ và tên *"
                    value={shippingInfo.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                    }`}
                    required
                    placeholder="Số điện thoại *"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="mt-4">
                <input
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                  }`}
                  type="email"
                  placeholder="Email (tuỳ chọn)"
                  value={shippingInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mt-4">
                <textarea
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                    errors.address ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                  }`}
                  required
                  placeholder="Địa chỉ cụ thể *"
                  rows="3"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.ward ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                    }`}
                    required
                    placeholder="Phường/Xã *"
                    value={shippingInfo.ward}
                    onChange={(e) => handleInputChange("ward", e.target.value)}
                  />
                  {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
                </div>

                <div>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.district
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                    required
                    placeholder="Quận/Huyện *"
                    value={shippingInfo.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                  />
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                <div>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.city ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                    }`}
                    required
                    placeholder="Tỉnh/Thành phố *"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
              </div>

              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none mt-4"
                placeholder="Ghi chú (tuỳ chọn)"
                rows="2"
                value={shippingInfo.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
              />

              <label className="inline-flex items-center mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-3 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Lưu thông tin cho lần sau</span>
              </label>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-600" />
                Phương thức vận chuyển
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === "standard"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-4 w-4 h-4 text-green-600"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Giao hàng tiêu chuẩn</div>
                    <div className="text-sm text-gray-600">
                      3-5 ngày làm việc • {subtotal >= 150000 ? "Miễn phí" : "30.000đ"}
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-4 w-4 h-4 text-orange-600"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Giao hàng nhanh</div>
                    <div className="text-sm text-gray-600">1-2 ngày làm việc • 50.000đ</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {[
                  { id: "cod", label: "Thanh toán khi nhận hàng", icon: "🚚", color: "green" },
                  { id: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦", color: "blue" },
                  { id: "momo", label: "Ví MoMo", icon: "📱", color: "pink" },
                  { id: "card", label: "Thẻ tín dụng/Ghi nợ", icon: "💳", color: "purple" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? `border-${method.color}-300 bg-${method.color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-4 w-4 h-4"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6 border border-gray-100">
              <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                <span>📋</span>
                Đơn hàng của bạn
              </h2>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-gray-600">{item.author}</div>
                      <div className="text-sm font-bold text-purple-600 mt-1">
                        {item.quantity} × {item.price.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200" />

              {/* Order Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{subtotal.toLocaleString("vi-VN")}đ</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Tiết kiệm:</span>
                    <span>-{savings.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}

                <div className="flex justify-between text-lg">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Miễn phí 🎉</span>
                    ) : (
                      `${shippingCost.toLocaleString("vi-VN")}đ`
                    )}
                  </span>
                </div>

                {shippingCost > 0 && subtotal < 150000 && (
                  <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border border-blue-100">
                    <span className="font-medium text-blue-700">💡 Mẹo:</span> Mua thêm{" "}
                    <span className="font-bold text-purple-600">{(150000 - subtotal).toLocaleString("vi-VN")}đ</span> để
                    được miễn phí vận chuyển!
                  </div>
                )}
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Tổng cộng:</span>
                <span className="text-purple-600">{total.toLocaleString("vi-VN")}đ</span>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-4">
                <label className="inline-flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mr-3 mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với{" "}
                    <Link to="/terms" className="text-purple-600 underline hover:text-purple-800">
                      điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link to="/privacy" className="text-purple-600 underline hover:text-purple-800">
                      chính sách bảo mật
                    </Link>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg transform hover:scale-105 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Shield className="inline-block w-5 h-5 mr-2" />
                  Đặt hàng ngay
                </button>

                <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Location Permission Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Sử dụng vị trí của bạn</h3>

              <p className="text-gray-600 mb-6">
                Chúng tôi muốn sử dụng vị trí của bạn để gợi ý địa chỉ giao hàng gần nhất và tính phí vận chuyển chính
                xác hơn.
              </p>

              {isLoadingLocation && (
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-2 text-gray-600">Đang lấy vị trí...</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Không, cảm ơn
                </button>
                <button
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50"
                >
                  {isLoadingLocation ? "Đang lấy..." : "Cho phép"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
