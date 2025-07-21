"use client"

import { useState } from "react"
import { Star, Filter, X } from "lucide-react"

const categories = [
  { id: "van-hoc", name: "📖 Văn học", count: 1250, color: "text-purple-600" },
  { id: "kinh-te", name: "💼 Kinh tế", count: 890, color: "text-blue-600" },
  { id: "khoa-hoc", name: "🔬 Khoa học", count: 650, color: "text-green-600" },
  { id: "lich-su", name: "📜 Lịch sử", count: 420, color: "text-orange-600" },
  { id: "tam-ly", name: "🧠 Tâm lý", count: 380, color: "text-pink-600" },
  { id: "thieu-nhi", name: "👶 Thiếu nhi", count: 720, color: "text-yellow-600" },
  { id: "giao-duc", name: "🎓 Giáo dục", count: 560, color: "text-indigo-600" },
  { id: "cong-nghe", name: "💻 Công nghệ", count: 340, color: "text-cyan-600" },
]

const publishers = [
  { id: "nxb-tre", name: "NXB Trẻ", count: 450 },
  { id: "nxb-kim-dong", name: "NXB Kim Đồng", count: 380 },
  { id: "nxb-lao-dong", name: "NXB Lao Động", count: 290 },
  { id: "nxb-van-hoc", name: "NXB Văn Học", count: 520 },
]

function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPublishers, setSelectedPublishers] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [selectedRating, setSelectedRating] = useState([])
  // const navigate = useNavigate;

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPublishers([])
    setPriceRange([0, 500000])
    setSelectedRating([])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedPublishers.length > 0 || selectedRating.length > 0

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div
        className="text-white rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Bộ lọc tìm kiếm</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
            >
              <X className="h-3 w-3" />
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-purple-600">📚</span>
          Thể loại
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <label className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  className="accent-purple-600 w-4 h-4"
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category.id])
                    } else {
                      setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                    }
                  }}
                />
                <span className={`text-sm font-medium ${category.color}`}>{category.name}</span>
              </label>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-green-600">💰</span>
          Khoảng giá
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number.parseInt(e.target.value)])}
            className="w-full accent-purple-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">0đ</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {priceRange[1].toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[50000, 100000, 200000].map((price) => (
              <button
                key={price}
                onClick={() => setPriceRange([0, price])}
                className="bg-gray-100 hover:bg-purple-100 hover:text-purple-700 px-2 py-1 rounded transition-colors"
              >
                ≤{price.toLocaleString("vi-VN")}đ
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-yellow-600">⭐</span>
          Đánh giá
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                className="accent-yellow-400 w-4 h-4"
                checked={selectedRating.includes(rating)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRating([...selectedRating, rating])
                  } else {
                    setSelectedRating(selectedRating.filter((r) => r !== rating))
                  }
                }}
              />
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">trở lên</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Publishers */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-blue-600">🏢</span>
          Nhà xuất bản
        </h3>
        <div className="space-y-3">
          {publishers.map((publisher) => (
            <div
              key={publisher.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <label className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4"
                  checked={selectedPublishers.includes(publisher.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPublishers([...selectedPublishers, publisher.id])
                    } else {
                      setSelectedPublishers(selectedPublishers.filter((id) => id !== publisher.id))
                    }
                  }}
                />
                <span className="text-sm font-medium text-gray-700">{publisher.name}</span>
              </label>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{publisher.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full text-white py-3 rounded-2xl font-medium transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 btn-gradient">
        <Filter className="w-4 h-4" />
        Áp dụng bộ lọc
      </button>
    </div>
  )
}

export default CategoryFilter
