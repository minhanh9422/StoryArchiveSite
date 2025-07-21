"use client"

import { useState } from "react"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat"
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  Settings,
  Star,
  Clock,
  Package,
  Gift,
  BookOpen,
  AlertCircle,
} from "lucide-react"

const mockNotifications = [
  {
    id: 1,
    type: "order",
    title: "Đơn hàng đã được giao thành công",
    message:
      "Đơn hàng #DH001234 với 2 cuốn sách đã được giao đến địa chỉ của bạn. Cảm ơn bạn đã mua sắm tại Story Archive!",
    time: "2024-01-15T14:30:00",
    read: false,
    important: true,
    category: "order",
    action_url: "/order-history",
    action_text: "Xem đơn hàng",
  },
  {
    id: 2,
    type: "promotion",
    title: "🔥 Flash Sale đang diễn ra - Giảm đến 50%!",
    message:
      "Hơn 1000 cuốn sách đang được giảm giá sốc. Thời gian có hạn, chỉ còn 2 giờ 15 phút. Đừng bỏ lỡ cơ hội này!",
    time: "2024-01-15T13:00:00",
    read: false,
    important: true,
    category: "promotion",
    action_url: "/promotions",
    action_text: "Mua ngay",
  },
  {
    id: 3,
    type: "wishlist",
    title: "💖 Sách trong wishlist của bạn đang giảm giá",
    message:
      "Cuốn sách 'Atomic Habits' trong danh sách yêu thích của bạn đang giảm 20%. Giá chỉ còn 96.000đ thay vì 120.000đ.",
    time: "2024-01-15T12:00:00",
    read: true,
    important: false,
    category: "wishlist",
    action_url: "/wishlist",
    action_text: "Xem wishlist",
  },
  {
    id: 4,
    type: "new_book",
    title: "📚 Sách mới từ tác giả yêu thích",
    message:
      "Paulo Coelho vừa phát hành cuốn sách mới 'The Archer'. Dựa trên sở thích đọc của bạn, chúng tôi nghĩ bạn sẽ thích cuốn sách này.",
    time: "2024-01-14T16:20:00",
    read: true,
    important: false,
    category: "new_book",
    action_url: "/new-releases",
    action_text: "Khám phá",
  },
  {
    id: 5,
    type: "order",
    title: "📦 Đơn hàng đang được chuẩn bị",
    message: "Đơn hàng #DH001235 của bạn đã được xác nhận và đang được chuẩn bị. Dự kiến giao hàng trong 2-3 ngày tới.",
    time: "2024-01-14T10:15:00",
    read: true,
    important: false,
    category: "order",
    action_url: "/order-history",
    action_text: "Theo dõi",
  },
  {
    id: 6,
    type: "system",
    title: "⚙️ Thông báo bảo trì hệ thống",
    message:
      "Hệ thống sẽ được bảo trì từ 2:00 - 4:00 sáng ngày mai để nâng cấp hiệu suất. Trong thời gian này, bạn có thể không thể truy cập website.",
    time: "2024-01-13T18:00:00",
    read: true,
    important: false,
    category: "system",
    action_url: null,
    action_text: null,
  },
  {
    id: 7,
    type: "promotion",
    title: "🎉 Chương trình khuyến mãi cuối tuần",
    message: "Mua 2 tặng 1 cho tất cả sách thuộc thể loại 'Phát triển bản thân'. Áp dụng từ thứ 6 đến chủ nhật.",
    time: "2024-01-12T09:30:00",
    read: true,
    important: false,
    category: "promotion",
    action_url: "/promotions",
    action_text: "Xem ưu đãi",
  },
  {
    id: 8,
    type: "review",
    title: "⭐ Đánh giá sản phẩm đã mua",
    message: "Bạn đã nhận được sách 'Nhà Giả Kim' cách đây 1 tuần. Hãy chia sẻ trải nghiệm của bạn để giúp người khác!",
    time: "2024-01-11T14:45:00",
    read: true,
    important: false,
    category: "review",
    action_url: "/order-history",
    action_text: "Đánh giá",
  },
]

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    { value: "all", label: "Tất cả", icon: Bell, color: "text-gray-600" },
    { value: "order", label: "Đơn hàng", icon: Package, color: "text-blue-600" },
    { value: "promotion", label: "Khuyến mãi", icon: Gift, color: "text-red-600" },
    { value: "wishlist", label: "Wishlist", icon: Star, color: "text-pink-600" },
    { value: "new_book", label: "Sách mới", icon: BookOpen, color: "text-green-600" },
    { value: "system", label: "Hệ thống", icon: Settings, color: "text-gray-600" },
    { value: "review", label: "Đánh giá", icon: Star, color: "text-yellow-600" },
  ]

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return "Vừa xong"
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return { icon: Package, color: "bg-blue-100 text-blue-600" }
      case "promotion":
        return { icon: Gift, color: "bg-red-100 text-red-600" }
      case "wishlist":
        return { icon: Star, color: "bg-pink-100 text-pink-600" }
      case "new_book":
        return { icon: BookOpen, color: "bg-green-100 text-green-600" }
      case "system":
        return { icon: Settings, color: "bg-gray-100 text-gray-600" }
      case "review":
        return { icon: Star, color: "bg-yellow-100 text-yellow-600" }
      default:
        return { icon: Bell, color: "bg-gray-100 text-gray-600" }
    }
  }

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    setSelectedNotifications((prev) => prev.filter((selectedId) => selectedId !== id))
  }

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id],
    )
  }

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((notif) => notif.id))
    }
  }

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => (selectedNotifications.includes(notif.id) ? { ...notif, read: true } : notif)),
    )
    setSelectedNotifications([])
  }

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((notif) => !selectedNotifications.includes(notif.id)))
    setSelectedNotifications([])
  }

  const filteredNotifications = notifications.filter((notif) => {
    const categoryMatch = filterCategory === "all" || notif.category === filterCategory
    const readMatch = filterRead === "all" || (filterRead === "read" ? notif.read : !notif.read)
    const searchMatch =
      searchTerm === "" ||
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())

    return categoryMatch && readMatch && searchMatch
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length
  const importantCount = notifications.filter((notif) => notif.important && !notif.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full relative">
              <Bell className="w-12 h-12" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">🔔 Thông Báo</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Cập nhật mới nhất về đơn hàng, khuyến mãi và sách mới dành cho bạn
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{notifications.length} thông báo</span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">{unreadCount} chưa đọc</span>
            </div>
            {importantCount > 0 && (
              <div className="bg-red-500/80 px-4 py-2 rounded-full animate-pulse">
                <span className="font-semibold">{importantCount} quan trọng</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{notifications.length}</h3>
                <p className="text-gray-600">Tổng thông báo</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{unreadCount}</h3>
                <p className="text-gray-600">Chưa đọc</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{importantCount}</h3>
                <p className="text-gray-600">Quan trọng</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                <CheckCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</h3>
                <p className="text-gray-600">Đã đọc</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thông báo..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Danh mục
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const count = notifications.filter((notif) =>
                    category.value === "all" ? true : notif.category === category.value,
                  ).length
                  return (
                    <label key={category.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={filterCategory === category.value}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Icon className={`w-4 h-4 ${category.color}`} />
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors flex-1">
                        {category.label}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{count}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Read Status Filter */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <h3 className="font-semibold text-gray-900">Trạng thái</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "unread", label: "Chưa đọc" },
                  { value: "read", label: "Đã đọc" },
                ].map((status) => (
                  <label key={status.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="readStatus"
                      value={status.value}
                      checked={filterRead === status.value}
                      onChange={(e) => setFilterRead(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={selectAllNotifications}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedNotifications.length === filteredNotifications.length}
                      onChange={() => {}}
                      className="rounded"
                    />
                    Chọn tất cả ({selectedNotifications.length})
                  </button>

                  {selectedNotifications.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={markSelectedAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCheck className="w-4 h-4" />
                        Đánh dấu đã đọc
                      </button>
                      <button
                        onClick={deleteSelected}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  Hiển thị {filteredNotifications.length} / {notifications.length} thông báo
                </div>
              </div>
            </div>

            {/* Notifications */}
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-blue-100">
                <Bell className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Không có thông báo</h3>
                <p className="text-gray-600">Không tìm thấy thông báo nào phù hợp với bộ lọc của bạn</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const iconConfig = getNotificationIcon(notification.type)
                  const Icon = iconConfig.icon

                  return (
                    <div
                      key={notification.id}
                      className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                        !notification.read
                          ? "border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
                          : "border-gray-200"
                      } ${selectedNotifications.includes(notification.id) ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="p-6">
                        <div className="flex gap-4">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 pt-1">
                            <input
                              type="checkbox"
                              checked={selectedNotifications.includes(notification.id)}
                              onChange={() => toggleSelectNotification(notification.id)}
                              className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>

                          {/* Icon */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${iconConfig.color}`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3
                                  className={`text-lg font-semibold text-gray-900 ${
                                    !notification.read ? "font-bold" : ""
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                {notification.important && (
                                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                                    Quan trọng
                                  </span>
                                )}
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {getTimeAgo(notification.time)}
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {notification.action_url && (
                                  <a
                                    href={notification.action_url}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-medium"
                                  >
                                    {notification.action_text}
                                  </a>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {!notification.read ? (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                  >
                                    <Check className="w-4 h-4" />
                                    Đánh dấu đã đọc
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => markAsUnread(notification.id)}
                                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1"
                                  >
                                    <Bell className="w-4 h-4" />
                                    Đánh dấu chưa đọc
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
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

      <Footer />
      <AIChat />
    </div>
  )
}

export default NotificationPage
