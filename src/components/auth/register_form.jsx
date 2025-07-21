"use client"

import { useState } from "react"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }

    if (!formData.agreeTerms) {
      alert("Vui lòng đồng ý với điều khoản sử dụng!")
      return
    }

    setLoading(true)

    // Mock registration - simulate API call
    setTimeout(() => {
      alert("Đăng ký thành công!")
      navigate("/login")
      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Họ và tên
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="name"
            type="text"
            placeholder="Nhập họ tên đầy đủ"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="email"
            type="email"
            placeholder="Nhập địa chỉ email"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Xác nhận mật khẩu
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
          className="w-4 h-4 accent-blue-600 mt-1"
          required
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-relaxed">
          Tôi đồng ý với{" "}
          <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
            Điều khoản sử dụng
          </a>{" "}
          và{" "}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
            Chính sách bảo mật
          </a>{" "}
          của StoryArchive
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-3 rounded-xl font-medium transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Đang tạo tài khoản...
          </div>
        ) : (
          "✨ Tạo tài khoản"
        )}
      </button>

      {/* Social Register */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Hoặc đăng ký với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="mr-2">🔵</span>
          Facebook
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="mr-2">🔴</span>
          Google
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
