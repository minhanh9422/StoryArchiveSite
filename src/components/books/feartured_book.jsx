import { Star, TrendingUp, Clock, Zap } from "lucide-react"
import { Link } from "react-router-dom"

// Mock featured books data
const mockFeaturedBooks = {
  topRated: [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 120000,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop",
      rating: 4.9,
      inStock: 45,
    },
    {
      id: 2,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      price: 89000,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop",
      rating: 4.8,
      inStock: 32,
    },
    {
      id: 3,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      price: 75000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop",
      rating: 4.7,
      inStock: 28,
    },
    {
      id: 4,
      title: "Tôi Thấy Hoa Vàng",
      author: "Nguyễn Nhật Ánh",
      price: 65000,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&h=200&fit=crop",
      rating: 4.8,
      inStock: 56,
    },
  ],
  bestSellers: [
    {
      id: 5,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 135000,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=150&h=200&fit=crop",
      rating: 4.6,
      inStock: 23,
    },
    {
      id: 6,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 98000,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=150&h=200&fit=crop",
      rating: 4.5,
      inStock: 34,
    },
    {
      id: 7,
      title: "The 7 Habits",
      author: "Stephen Covey",
      price: 145000,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=150&h=200&fit=crop",
      rating: 4.6,
      inStock: 19,
    },
    {
      id: 8,
      title: "Cây Cam Ngọt",
      author: "José Mauro",
      price: 78000,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=200&fit=crop",
      rating: 4.7,
      inStock: 41,
    },
  ],
  newest: [
    {
      id: 9,
      title: "AI Revolution",
      author: "Tech Expert",
      price: 180000,
      image: "https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?w=150&h=200&fit=crop",
      rating: 4.4,
      inStock: 15,
    },
    {
      id: 10,
      title: "Future Skills",
      author: "Innovation Lab",
      price: 165000,
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=150&h=200&fit=crop",
      rating: 4.3,
      inStock: 22,
    },
    {
      id: 11,
      title: "Digital Mindset",
      author: "Tech Guru",
      price: 155000,
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=150&h=200&fit=crop",
      rating: 4.5,
      inStock: 18,
    },
    {
      id: 12,
      title: "Green Living",
      author: "Eco Writer",
      price: 125000,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop",
      rating: 4.2,
      inStock: 27,
    },
  ],
}

function FeaturedBooks() {
  const sections = [
    {
      title: "Được đánh giá cao",
      icon: Star,
      books: mockFeaturedBooks.topRated,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
    },
    {
      title: "Bán chạy nhất",
      icon: TrendingUp,
      books: mockFeaturedBooks.bestSellers,
      gradient: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
      bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
    },
    {
      title: "Sách mới ra mắt",
      icon: Clock,
      books: mockFeaturedBooks.newest,
      gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
      bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    },
  ]

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-3xl p-8 shadow-lg border border-white/50"
          style={{ background: section.bgGradient }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: section.gradient }}
            >
              <section.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <p className="text-gray-600">Khám phá những cuốn sách tuyệt vời nhất</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.books.map((book) => (
              <Link
                to={`/book/${book.id}`}
                key={book.id}
                className="bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group card-hover"
              >
                <div
                  className="aspect-[3/4] mb-4 overflow-hidden rounded-xl relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                  }}
                >
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600">{book.author}</p>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{book.price.toLocaleString("vi-VN")}đ</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium
                      ${
                        book.inStock > 20
                          ? "bg-green-100 text-green-800"
                          : book.inStock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.inStock > 0 ? `Còn ${book.inStock}` : "Hết hàng"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="text-white px-8 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
              style={{ background: section.gradient }}
            >
              <Zap className="w-4 h-4" />
              Xem tất cả {section.title.toLowerCase()}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeaturedBooks
