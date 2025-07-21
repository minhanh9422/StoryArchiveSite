"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Đăng ký email: ${email}`)
    setEmail("")
  }

  return (
    <footer
      className="text-white"
      style={{ background: "linear-gradient(135deg, #1f2937 0%, #667eea 50%, #ec4899 100%)" }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)" }}
              >
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                StoryArchive
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nhà sách trực tuyến hàng đầu Việt Nam với hàng nghìn đầu sách chất lượng, giao hàng nhanh chóng và dịch vụ
              AI gợi ý thông minh.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: "hover:text-blue-400" },
                { Icon: Twitter, color: "hover:text-sky-400" },
                { Icon: Instagram, color: "hover:text-pink-400" },
                { Icon: Youtube, color: "hover:text-red-400" },
              ].map(({ Icon, color }, index) => (
                <button
                  key={index}
                  className={`p-2 text-gray-400 ${color} transition-colors rounded-full hover:bg-white/10`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Về chúng tôi", "/about"],
                ["Liên hệ", "/contact"],
                ["Chính sách giao hàng", "/shipping"],
                ["Đổi trả", "/returns"],
                ["Bảo mật", "/privacy"],
                ["Điều khoản", "/terms"],
              ].map(([text, href], i) => (
                <li key={i}>
                  <Link
                    to={href}
                    className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-300">Danh mục sách</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["📖 Văn học", "van-hoc"],
                ["💼 Kinh tế", "kinh-te"],
                ["🔬 Khoa học", "khoa-hoc"],
                ["🧠 Tâm lý", "tam-ly"],
                ["👶 Thiếu nhi", "thieu-nhi"],
                ["🎓 Giáo dục", "giao-duc"],
              ].map(([name, slug], i) => (
                <li key={i}>
                  <Link to={`/category/${slug}`} className="text-gray-300 hover:text-pink-300 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Liên hệ & Đăng ký</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>1900-1234</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span>support@storyarchive.com</span>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <h4 className="font-medium text-yellow-300">📧 Đăng ký nhận tin</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:border-purple-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="text-white text-sm px-4 py-2 rounded-lg transition-all hover:shadow-lg btn-gradient"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2024 StoryArchive. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse"></span>
                Hệ thống hoạt động bình thường
              </span>
              <span>|</span>
              <span>Phiên bản 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
