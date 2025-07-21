"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from "lucide-react"

const suggestedQuestions = [
  "🔥 Gợi ý sách hay cho tôi",
  "📈 Sách nào đang bán chạy nhất?",
  "🧠 Tôi muốn đọc sách về tâm lý học",
  "🎉 Có khuyến mãi g�� không?",
  "📦 Làm sao để theo dõi đơn hàng?",
]

const initialMessages = [
  {
    id: 1,
    type: "bot",
    message:
      "Xin chào! 👋 Tôi là AI Assistant của StoryArchive. Tôi có thể giúp bạn tìm sách, tư vấn và trả lời các câu hỏi. Bạn cần hỗ trợ gì? ✨",
    timestamp: new Date(),
  },
]

function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = (message) => {
    if (!message.trim()) return

    const userMsg = {
      id: Date.now(),
      type: "user",
      message: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        message: generateAIResponse(message),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (msg) => {
    const lower = msg.toLowerCase()

    if (lower.includes("gợi ý") || lower.includes("recommend")) {
      return '📚 Gợi ý cho bạn: "Nhà Giả Kim" (Paulo Coelho), "Đắc Nhân Tâm" (Dale Carnegie), "Sapiens" (Yuval Noah Harari)... Bạn thích thể loại nào? 🤔'
    }
    if (lower.includes("bán chạy") || lower.includes("bestseller")) {
      return "🔥 Top 5 sách bán chạy: Nhà Giả Kim, Đắc Nhân Tâm, Tôi Thấy Hoa Vàng..., Cây Cam Ngọt..., Atomic Habits. Tất cả đều có giá ưu đãi! 💫"
    }
    if (lower.includes("tâm lý") || lower.includes("psychology")) {
      return '🧠 Sách tâm lý hay: "Đắc Nhân Tâm", "Atomic Habits", "Tuổi Trẻ Đáng Giá Bao Nhiêu"... Bạn cần sách chuyên sâu hơn không? 📖'
    }
    if (lower.includes("khuyến mãi") || lower.includes("sale")) {
      return "🎉 Ưu đãi HOT: Giảm 26% cho Nhà Giả Kim, 21% cho Đắc Nhân Tâm, miễn phí ship đơn trên 150k. Flash sale cuối tuần! ⚡"
    }
    if (lower.includes("đơn hàng") || lower.includes("order")) {
      return '📦 Bạn có thể theo dõi đơn hàng tại "Lịch sử mua hàng" hoặc dùng mã đơn hàng để tra cứu. Cần hỗ trợ gì thêm không? 🤝'
    }

    return "✨ Cảm ơn bạn! Tôi sẽ hỗ trợ bạn tốt nhất. Bạn có thể hỏi về sách, đơn hàng, khuyến mãi... Tôi luôn sẵn sàng giúp đỡ! 🚀"
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full text-white shadow-2xl flex items-center justify-center z-50 transform hover:scale-110 transition-all duration-300 pulse"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <MessageCircle className="h-7 w-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 text-white"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              AI Assistant
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse"></div>
              Đang hoạt động
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat content */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)" }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            {msg.type === "bot" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm shadow-lg ${
                msg.type === "user"
                  ? "text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
              }`}
              style={msg.type === "user" ? { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" } : {}}
            >
              {msg.message}
            </div>
            {msg.type === "user" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
              >
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full bounce" />
                <div className="w-2 h-2 bg-pink-400 rounded-full bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-orange-400 rounded-full bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div
          className="p-4 border-t"
          style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Câu hỏi gợi ý:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, i) => (
              <button
                key={i}
                onClick={() => sendMessage(question)}
                className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-xs px-3 py-2 rounded-full transition-all transform hover:scale-105 bg-white shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập câu hỏi của bạn... 💬"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputMessage)}
            className="flex-1 border-2 border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="text-white px-4 py-3 rounded-full disabled:opacity-50 transition-all shadow-lg transform hover:scale-105 disabled:transform-none btn-gradient"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat
