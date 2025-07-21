"use client"

// import { useParams } from "react-router-dom"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import AIChat from "../components/AI/AiChat"
import BookDetailMain from "../components/layout/BookDetailMain"

function BookDetailPage() {
  // const { id } = useParams()
  const { id } = 1

  return (
    <>
      <Header />
      <main>
        <BookDetailMain bookId={id} />
      </main>
      <Footer />
      <AIChat />
    </>
  )
}

export default BookDetailPage
