"use client"

import { useState } from "react"
import {
  Package,
  Search,
  Eye,
  RotateCcw,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  MessageCircle,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Wallet,
  DollarSign,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react"
import Header from "../components/layout/header" 
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat" 

const orders = [
  {
    id: "DH001234",
    date: "2024-01-15",
    status: "delivered",
    total: 284000,
    paymentMethod: "COD",
    items: [
      {
        id: 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 89000,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      },
      {
        id: 2,
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: 75000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      },
    ],
    shipping: {
      method: "Giao hàng tiêu chuẩn",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
      trackingCode: "VN123456789",
    },
    timeline: [
      { status: "Đã giao hàng", date: "2024-01-18 14:30", completed: true },
      { status: "Đang giao hàng", date: "2024-01-18 08:00", completed: true },
      { status: "Đã xuất kho", date: "2024-01-17 16:45", completed: true },
      { status: "Đã xác nhận", date: "2024-01-15 10:20", completed: true },
    ],
  },
  {
    id: "DH001235",
    date: "2024-01-20",
    status: "shipping",
    total: 195000,
    paymentMethod: "banking",
    items: [
      {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 120000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
      },
      {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        price: 95000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      },
    ],
    shipping: {
      method: "Giao hàng nhanh",
      address: "456 Đường DEF, Phường UVW, Quận 3, TP.HCM",
      trackingCode: "VN987654321",
    },
    timeline: [
      { status: "Đang giao hàng", date: "2024-01-22 09:15", completed: true },
      { status: "Đã xuất kho", date: "2024-01-21 14:20", completed: true },
      { status: "Đã xác nhận", date: "2024-01-20 11:30", completed: true },
    ],
  },
  {
    id: "DH001236",
    date: "2024-01-25",
    status: "pending",
    total: 143000,
    paymentMethod: "momo",
    items: [
      {
        id: 5,
        title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        author: "Nguyễn Nhật Ánh",
        price: 65000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=300&fit=crop",
      },
      {
        id: 6,
        title: "Cây Cam Ngọt Của Tôi",
        author: "José Mauro de Vasconcelos",
        price: 78000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
      },
    ],
    shipping: {
      method: "Giao hàng tiêu chuẩn",
      address: "789 Đường GHI, Phường RST, Quận 7, TP.HCM",
      trackingCode: "",
    },
    timeline: [{ status: "Chờ xác nhận", date: "2024-01-25 16:45", completed: true }],
  },
  {
    id: "DH001237",
    date: "2024-02-01",
    status: "confirmed",
    total: 267000,
    paymentMethod: "credit",
    items: [
      {
        id: 7,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        price: 98000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
      },
      {
        id: 8,
        title: "The 7 Habits",
        author: "Stephen Covey",
        price: 145000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop",
      },
    ],
    shipping: {
      method: "Giao hàng tiêu chuẩn",
      address: "101 Đường JKL, Phường MNO, Quận 2, TP.HCM",
      trackingCode: "VN543216789",
    },
    timeline: [
      { status: "Đã xác nhận", date: "2024-02-01 13:20", completed: true },
      { status: "Chờ xác nhận", date: "2024-02-01 09:45", completed: true },
    ],
  },
  {
    id: "DH001238",
    date: "2024-02-05",
    status: "cancelled",
    total: 89000,
    paymentMethod: "COD",
    items: [
      {
        id: 9,
        title: "Dám Bị Ghét",
        author: "Koga Fumitake",
        price: 89000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
      },
    ],
    shipping: {
      method: "Giao hàng tiêu chuẩn",
      address: "202 Đường PQR, Phường STU, Quận 5, TP.HCM",
      trackingCode: "",
    },
    timeline: [
      { status: "Đã hủy", date: "2024-02-06 10:15", completed: true },
      { status: "Chờ xác nhận", date: "2024-02-05 14:30", completed: true },
    ],
  },
]

const statusConfig = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  shipping: { label: "Đang giao hàng", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Đã giao hàng", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: XCircle },
}

const paymentMethodConfig = {
  COD: { label: "Thanh toán khi nhận hàng", icon: DollarSign, color: "text-green-600" },
  banking: { label: "Chuyển khoản ngân hàng", icon: CreditCard, color: "text-blue-600" },
  momo: { label: "Ví MoMo", icon: Wallet, color: "text-pink-600" },
  credit: { label: "Thẻ tín dụng/ghi nợ", icon: CreditCard, color: "text-purple-600" },
}

function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([])
  const [expandedFilters, setExpandedFilters] = useState({
    status: true,
    date: true,
    payment: true,
    price: true,
  })

  // Toggle filter sections
  const toggleFilter = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section],
    })
  }

  // Handle payment method selection
  const togglePaymentMethod = (method) => {
    if (selectedPaymentMethods.includes(method)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter((m) => m !== method))
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, method])
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedStatus("all")
    setDateRange({ from: "", to: "" })
    setPriceRange({ min: "", max: "" })
    setSelectedPaymentMethods([])
    setSearchTerm("")
  }

  // Filter orders based on all criteria
  const filteredOrders = orders.filter((order) => {
    // Search term filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    // Status filter
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus

    // Payment method filter
    const matchesPayment = selectedPaymentMethods.length === 0 || selectedPaymentMethods.includes(order.paymentMethod)

    // Date range filter
    let matchesDate = true
    if (dateRange.from) {
      matchesDate = matchesDate && new Date(order.date) >= new Date(dateRange.from)
    }
    if (dateRange.to) {
      matchesDate = matchesDate && new Date(order.date) <= new Date(dateRange.to)
    }

    // Price range filter
    let matchesPrice = true
    if (priceRange.min) {
      matchesPrice = matchesPrice && order.total >= Number(priceRange.min)
    }
    if (priceRange.max) {
      matchesPrice = matchesPrice && order.total <= Number(priceRange.max)
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate && matchesPrice
  })

  const getStatusBadge = (status) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const getPaymentMethodBadge = (method) => {
    const config = paymentMethodConfig[method]
    const Icon = config.icon
    return (
      <span className="inline-flex items-center text-sm">
        <Icon className={`h-4 w-4 mr-1 ${config.color}`} />
        {config.label}
      </span>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Lịch sử đơn hàng</h1>
          <p className="text-gray-600 mb-6">Theo dõi và quản lý các đơn hàng của bạn</p>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    <h3 className="font-semibold">Bộ lọc đơn hàng</h3>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="text-xs flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Đặt lại
                  </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm đơn hàng..."
                      className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="border-b">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleFilter("status")}
                  >
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Trạng thái</h4>
                    </div>
                    {expandedFilters.status ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  {expandedFilters.status && (
                    <div className="px-4 pb-4 space-y-2">
                      {[
                        { value: "all", label: "Tất cả" },
                        { value: "pending", label: "Chờ xác nhận" },
                        { value: "confirmed", label: "Đã xác nhận" },
                        { value: "shipping", label: "Đang giao" },
                        { value: "delivered", label: "Đã giao" },
                        { value: "cancelled", label: "Đã hủy" },
                      ].map((status) => (
                        <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            checked={selectedStatus === status.value}
                            onChange={() => setSelectedStatus(status.value)}
                            className="accent-purple-600"
                          />
                          <span className="text-sm">{status.label}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto">
                            {status.value === "all"
                              ? orders.length
                              : orders.filter((o) => o.status === status.value).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Range Filter */}
                <div className="border-b">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleFilter("date")}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Thời gian</h4>
                    </div>
                    {expandedFilters.date ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  {expandedFilters.date && (
                    <div className="px-4 pb-4 space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Từ ngày</label>
                        <input
                          type="date"
                          className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={dateRange.from}
                          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Đến ngày</label>
                        <input
                          type="date"
                          className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={dateRange.to}
                          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={() => {
                            const today = new Date()
                            const lastWeek = new Date()
                            lastWeek.setDate(today.getDate() - 7)
                            setDateRange({
                              from: lastWeek.toISOString().split("T")[0],
                              to: today.toISOString().split("T")[0],
                            })
                          }}
                          className="text-xs bg-gray-100 hover:bg-purple-100 hover:text-purple-700 px-2 py-1.5 rounded transition-colors"
                        >
                          7 ngày qua
                        </button>
                        <button
                          onClick={() => {
                            const today = new Date()
                            const lastMonth = new Date()
                            lastMonth.setMonth(today.getMonth() - 1)
                            setDateRange({
                              from: lastMonth.toISOString().split("T")[0],
                              to: today.toISOString().split("T")[0],
                            })
                          }}
                          className="text-xs bg-gray-100 hover:bg-purple-100 hover:text-purple-700 px-2 py-1.5 rounded transition-colors"
                        >
                          30 ngày qua
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method Filter */}
                <div className="border-b">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleFilter("payment")}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Phương thức thanh toán</h4>
                    </div>
                    {expandedFilters.payment ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  {expandedFilters.payment && (
                    <div className="px-4 pb-4 space-y-2">
                      {Object.entries(paymentMethodConfig).map(([key, value]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPaymentMethods.includes(key)}
                            onChange={() => togglePaymentMethod(key)}
                            className="accent-purple-600"
                          />
                          <span className={`text-sm flex items-center gap-1 ${value.color}`}>
                            <value.icon className="h-3 w-3" />
                            {value.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="border-b">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleFilter("price")}
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Giá trị đơn hàng</h4>
                    </div>
                    {expandedFilters.price ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  {expandedFilters.price && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className="flex gap-2 items-center">
                        <div>
                          <label className="text-sm text-gray-600 block mb-1">Từ</label>
                          <input
                            type="number"
                            placeholder="0đ"
                            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          />
                        </div>
                        <div className="pt-5">-</div>
                        <div>
                          <label className="text-sm text-gray-600 block mb-1">Đến</label>
                          <input
                            type="number"
                            placeholder="1.000.000đ"
                            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[100000, 200000, 500000].map((price) => (
                          <button
                            key={price}
                            onClick={() => setPriceRange({ min: "0", max: price.toString() })}
                            className="text-xs bg-gray-100 hover:bg-purple-100 hover:text-purple-700 px-2 py-1.5 rounded transition-colors"
                          >
                            ≤{price.toLocaleString("vi-VN")}đ
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Filters Button */}
                <div className="p-4">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Filter className="h-4 w-4" />
                    Áp dụng bộ lọc
                  </button>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="lg:w-3/4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-md">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Không tìm thấy đơn hàng</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ||
                    selectedStatus !== "all" ||
                    selectedPaymentMethods.length > 0 ||
                    dateRange.from ||
                    dateRange.to ||
                    priceRange.min ||
                    priceRange.max
                      ? "Không tìm thấy đơn hàng phù hợp với bộ lọc. Vui lòng thử lại với bộ lọc khác."
                      : "Bạn chưa có đơn hàng nào."}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Đơn hàng # <span className="text-purple-700 font-mono">{order.id}</span>
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> Ngày đặt: {order.date}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-700">
                            {order.total.toLocaleString("vi-VN")}đ
                          </div>
                          <div className="text-sm text-gray-600">{order.items.length} sản phẩm</div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">Phương thức thanh toán:</div>
                          {getPaymentMethodBadge(order.paymentMethod)}
                        </div>

                        {/* Items */}
                        <div className="space-y-4 mb-6">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-12 h-16 object-cover rounded-md shadow-sm"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600">{item.author}</p>
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-gray-500">Số lượng: {item.quantity}</span>
                                  <span className="font-medium text-purple-700">
                                    {item.price.toLocaleString("vi-VN")}đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-purple-600 mt-0.5" />
                            <div>
                              <span className="font-medium text-gray-900">{order.shipping.method}</span>
                              <p className="text-sm text-gray-600 mt-1">{order.shipping.address}</p>
                              {order.shipping.trackingCode && (
                                <p className="text-sm mt-1">
                                  Mã vận đơn:{" "}
                                  <span className="font-mono font-medium text-purple-700">
                                    {order.shipping.trackingCode}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-gray-900">Trạng thái đơn hàng</h4>
                          <div className="space-y-3">
                            {order.timeline.map((step, index) => (
                              <div key={index} className="flex gap-3 items-start">
                                <div className="relative">
                                  <span
                                    className={`block w-3 h-3 rounded-full mt-1.5 ${
                                      step.completed ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-300"
                                    }`}
                                  ></span>
                                  {index < order.timeline.length - 1 && (
                                    <span className="absolute top-4 bottom-0 left-1.5 w-0.5 -ml-px h-full bg-gray-200"></span>
                                  )}
                                </div>
                                <div>
                                  <p
                                    className={`text-sm font-medium ${
                                      step.completed ? "text-gray-900" : "text-gray-500"
                                    }`}
                                  >
                                    {step.status}
                                  </p>
                                  <p className="text-xs text-gray-500">{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Eye className="h-4 w-4 mr-2 text-purple-600" /> Xem chi tiết
                          </button>

                          {order.status === "delivered" && (
                            <>
                              <button className="flex items-center px-4 py-2 text-sm border border-yellow-300 text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                                <Star className="h-4 w-4 mr-2 text-yellow-500" /> Đánh giá
                              </button>
                              <button className="flex items-center px-4 py-2 text-sm border border-green-300 text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                <RotateCcw className="h-4 w-4 mr-2 text-green-500" /> Mua lại
                              </button>
                            </>
                          )}

                          {order.status === "pending" && (
                            <button className="flex items-center px-4 py-2 text-sm border border-red-300 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                              <XCircle className="h-4 w-4 mr-2 text-red-500" /> Hủy đơn
                            </button>
                          )}

                          <button className="flex items-center px-4 py-2 text-sm border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors ml-auto">
                            <MessageCircle className="h-4 w-4 mr-2 text-blue-500" /> Liên hệ hỗ trợ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChat />
    </>
  )
}

export default OrderHistoryPage
