import { Link } from "react-router-dom"
import LoginForm from "../components/auth/login_form"

function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <div
            className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            <span className="text-white font-bold text-xl">📚</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Đăng nhập tài khoản</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{" "}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500 underline">
              tạo tài khoản mới
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
