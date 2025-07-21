import BookDetail from "../books/book_detail" 
import BookReviews from "../books/book_review"
import RelatedBooks from "../books/related_book" 
import AIRecommendations from "../AI/ai-recommendation" 

function BookDetailMain({ bookId }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <BookDetail bookId={bookId} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookReviews bookId={bookId} />
          </div>

          <div className="space-y-8">
            <AIRecommendations bookId={bookId} />
            <RelatedBooks bookId={bookId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailMain
