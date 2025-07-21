import Header from "../components/layout/header" 
import Footer from "../components/layout/footer" 
import AIChat from "../components/AI/AiChat" 
import HomeBook from "../components/layout/book_homemain" 

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeBook />
      </main>
      <Footer />
      <AIChat />
    </>
  )
}

export default HomePage
