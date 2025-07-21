import ForgotPasswordForm from "../components/auth/forgetpassword_form"
function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Quên mật khẩu?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập địa chỉ email đã đăng ký để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default ForgotPasswordPage