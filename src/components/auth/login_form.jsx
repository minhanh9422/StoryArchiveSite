"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Mock login - simulate API call
    setTimeout(() => {
      alert("Đăng nhập thành công!")
      navigate("/")
      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Nhập email của bạn"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
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
            placeholder="Nhập mật khẩu"
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
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

      {/* Remember me + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.remember}
            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            className="w-4 h-4 accent-purple-600"
          />
          <span className="text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <a href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
          Quên mật khẩu?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-3 rounded-xl font-medium transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none btn-gradient"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Đang đăng nhập...
          </div>
        ) : (
          "🚀 Đăng nhập"
        )}
      </button>

      {/* Social Login */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
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

export default LoginForm
