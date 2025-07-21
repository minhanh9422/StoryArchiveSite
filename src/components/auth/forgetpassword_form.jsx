"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert(data.message || "Gửi yêu cầu thất bại")
      }
    } catch (error) {
      console.error(error)
      alert("Có lỗi xảy ra, vui lòng thử lại.")
    }
  }

  return submitted ? (
    <div className="text-center text-green-600">
      Email đặt lại mật khẩu đã được gửi (nếu email tồn tại).
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">Email của bạn</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="email"
            type="email"
            placeholder="Nhập email"
            className="w-full pl-10 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Gửi liên kết đặt lại mật khẩu
      </button>
    </form>
  )
}

export default ForgotPasswordForm