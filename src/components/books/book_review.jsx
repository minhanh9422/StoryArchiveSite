"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageCircle, Filter, User } from "lucide-react"

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Cuốn sách tuyệt vời! Câu chuyện rất cảm động và ý nghĩa. Paulo Coelho đã viết một tác phẩm kinh điển về việc theo đuổi ước mơ. Tôi đã đọc đi đọc lại nhiều lần và mỗi lần đều có cảm nhận mới.",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    user: "Trần Thị B",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Sách hay, nội dung sâu sắc. Tuy nhiên có một số đoạn hơi khó hiểu. Nhìn chung vẫn là một cuốn sách đáng đọc cho những ai muốn tìm hiểu về triết lý sống.",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    user: "Lê Minh C",
    rating: 5,
    date: "2024-01-08",
    comment:
      "Đây là lần thứ 3 tôi mua cuốn sách này để tặng bạn bè. Chất lượng in ấn tốt, giá cả hợp lý. Nội dung không cần bàn cãi - một kiệt tác!",
    helpful: 31,
    verified: false,
  },
  {
    id: 4,
    user: "Phạm Thu D",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Cuốn sách mang đến nhiều bài học quý giá về cuộc sống. Phong cách viết của Paulo Coelho rất cuốn hút. Giao hàng nhanh, đóng gói cẩn thận.",
    helpful: 12,
    verified: true,
  },
  {
    id: 5,
    user: "Hoàng Văn E",
    rating: 5,
    date: "2024-01-03",
    comment:
      "Tác phẩm kinh điển! Đã đọc bản tiếng Anh và giờ mua bản tiếng Việt để đọc lại. Bản dịch rất tốt, truyền tải được hết tinh thần của tác phẩm gốc.",
    helpful: 27,
    verified: true,
  },
]

function BookReviews({ bookId }) {
  const [reviews] = useState(mockReviews)
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")

  // Calculate rating statistics
  const totalReviews = reviews.length
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  const filteredReviews = reviews
    .filter((review) => filterRating === "all" || review.rating === Number.parseInt(filterRating))
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "rating-high":
          return b.rating - a.rating
        case "rating-low":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Đánh giá từ khách hàng</h2>
          <p className="text-gray-600">
            {totalReviews} đánh giá • Trung bình {averageRating.toFixed(1)}/5
          </p>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div
          className="text-center p-6 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)" }}
        >
          <div className="text-5xl font-bold text-orange-600 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-gray-600">Dựa trên {totalReviews} đánh giá</p>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm font-medium w-8">{rating}⭐</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${totalReviews > 0 ? (ratingCounts[index] / totalReviews) * 100 : 0}%`,
                    background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{ratingCounts[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="all">Tất cả đánh giá</option>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
          <option value="3">3 sao</option>
          <option value="2">2 sao</option>
          <option value="1">1 sao</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="rating-high">Đánh giá cao nhất</option>
          <option value="rating-low">Đánh giá thấp nhất</option>
          <option value="helpful">Hữu ích nhất</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                <User className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{review.user}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      ✅ Đã mua hàng
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("vi-VN")}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.rating}/5</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Hữu ích ({review.helpful})
                  </button>
                  <button className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Trả lời</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="text-white px-8 py-3 rounded-full transition-all shadow-lg transform hover:scale-105 btn-gradient">
          Xem thêm đánh giá
        </button>
      </div>
    </div>
  )
}

export default BookReviews
