"use client"

import { useState } from "react"
import { Search, BookOpen, Star, TrendingUp, Sparkles } from "lucide-react"

function Brand() {
  const [search, setSearch] = useState("")

  return (
    <section
      className="relative text-white py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-300 rounded-full pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl"><img src="/logo512.png" alt="logo" className="h-full w-full rounded-lg" /></span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Khám Phá Thế Giới Sách Cùng Story Archive
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            🌟 Hàng nghìn đầu sách hay • 🚀 Giao hàng nhanh • 🤖 AI gợi ý thông minh
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm sách, tác giả, thể loại..."
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
            </div>
            <button
              className="text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" }}
              onClick={() => console.log("Tìm kiếm:", search)}
            >
              🔍 Tìm Kiếm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105 card-hover">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
              >
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10,000+ Đầu Sách</h3>
              <p className="opacity-80">Đa dạng thể loại từ văn học đến khoa học</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105 card-hover">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)" }}
              >
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Gợi Ý Thông Minh</h3>
              <p className="opacity-80">Tìm sách phù hợp với sở thích của bạn</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105 card-hover">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" }}
              >
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Giao Hàng Nhanh</h3>
              <p className="opacity-80">Nhận sách trong 24-48 giờ</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "50K+", label: "Khách hàng" },
              { number: "10K+", label: "Đầu sách" },
              { number: "99%", label: "Hài lòng" },
              { number: "24/7", label: "Hỗ trợ" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand
