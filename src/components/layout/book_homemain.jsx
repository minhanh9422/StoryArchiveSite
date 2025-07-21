import Brand from "../brand/brand" 
import FeaturedBooks from "../books/feartured_book" 
import CategoryFilter from "../filter/category_filter" 
import BookGrid from "../books/book_grid"

function HomeBook() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
      }}
    >
      <Brand />

      <div className="container mx-auto px-4 py-8">
        <FeaturedBooks />

        <div className="mt-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80">
              <CategoryFilter />
            </aside>
            <main className="flex-1">
              <BookGrid />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBook
